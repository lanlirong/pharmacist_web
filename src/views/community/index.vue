<template>
  <div class="community">
    <div class="left-container">
      <a-card>你可能感兴趣的帖子</a-card>
    </div>
    <div class="post-container">
      <!--  -->
      <a-card class="send-message">
        <a-textarea
          v-model="post"
          placeholder="发表点你的观点吧..."
          :rows="4"
        />
        <a-button
          v-if="!publishLoading"
          class="publish"
          type="primary"
          @click="publish"
          >发布</a-button
        >
        <a-button v-else class="publish" type="primary" loading>发布</a-button>
      </a-card>
      <!-- tab -->
      <div class="tab-wrap">
        <div class="tabs">
          <div
            class="tab"
            :class="active == 1 ? 'active' : ''"
            @click="changeTab(1)"
          >
            最新帖子
          </div>
          <div
            class="tab"
            :class="active == 2 ? 'active' : ''"
            @click="changeTab(2)"
          >
            最热帖子
          </div>
          <div
            class="tab"
            :class="active == 0 ? 'active' : ''"
            @click="changeTab(0)"
          >
            我发布的
          </div>
        </div>
        <a-input-search
          placeholder="查询帖子"
          style="width: 200px"
          @search="onSearch"
        />
      </div>
      <!-- 帖子 -->
      <loading v-if="loading" tip="数据加载中..." size="large" />
      <div v-else>
        <a-card
          class="post-message"
          v-for="(post, index) in postList"
          :key="index"
        >
          <div class="post-item">
            <a-comment>
              <template slot="actions">
                <!-- 喜欢 -->
                <span key="comment-basic-like">
                  <a-tooltip title="Like">
                    <a-icon
                      type="like"
                      :theme="action === 'liked' ? 'filled' : 'outlined'"
                      @click="like"
                    />
                  </a-tooltip>
                  <span style="padding-left: '8px';cursor: 'auto'">
                    {{ post.like }}
                  </span>
                </span>
                <!--  留言-->
                <span key="comment-basic-reply-to">
                  <a-icon
                    type="mail"
                    theme="outlined"
                    @click="getComment(post)"
                  /><span style="padding-left: '8px';cursor: 'auto'">
                    {{ post.commentTotal }}
                  </span></span
                >
              </template>
              <a slot="author">{{ post.name }}</a>
              <a-avatar slot="avatar" :src="post.avatar" alt="Han Solo" />
              <p slot="content">
                {{ post.post }}
              </p>
              <template slot="datetime" :title="post.createTime">
                <span>{{ post.createTime }}</span>
              </template>
            </a-comment>
            <div class="all-comment-container" v-if="post.commentVisible">
              <a-divider />
              <!-- 添加评论 -->
              <a-comment>
                <a-avatar slot="avatar" :src="myInfo.avatar" alt="Han Solo" />
                <div slot="content">
                  <a-textarea :rows="2" v-model="myComment" />
                  <a-button
                    class="comment-btn"
                    html-type="submit"
                    :loading="submitLoading"
                    type="primary"
                    @click="handleSubmit"
                  >
                    添加评论
                  </a-button>
                </div>
              </a-comment>
              <a-divider />
              <!-- 所有评论 -->
              <a-empty
                v-if="!comLoading && post.commentTotal == 0"
                description="暂无评论"
              />
              <loading v-if="comLoading" tip="数据加载中..." size="large" />

              <a-comment
                v-else
                v-for="(item, index) in post.comment"
                :key="index"
              >
                <template slot="datetime" :title="item.createTime">
                  <span>{{ item.createTime }}</span>
                </template>
                <a-avatar slot="avatar" :src="item.avatar" alt="Han Solo" />
                <a slot="author">{{ item.name }}</a>
                <p slot="content">
                  {{ item.content }}
                </p>
                <a-comment
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                >
                  <span slot="actions">Reply to {{ child.replyToName }}</span>
                  <a-avatar slot="avatar" :src="child.avatar" alt="Han Solo" />
                  <a slot="author">{{ child.name }}</a>
                  <template slot="datetime" :title="child.createTime">
                    <span>{{ child.createTime }}</span>
                  </template>
                  <p slot="content">
                    {{ child.content }}
                  </p>
                </a-comment>
              </a-comment>
              <div v-if="!isLastComment">更多评论</div>
            </div>
          </div>
        </a-card>
        <!-- 更多 -->
        <div class="btn" v-if="!isLast" @click="getMore">查看更多...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { _publish, _getList, _getComment } from '@/services/api/post';
import { getCookie } from '@/utils/tool.js';
export default {
  data() {
    return {
      action: null,
      active: 2,
      post: '',
      params: {
        size: 10,
        page: 1,
        type: 2,
        searchKey: ''
      },
      postList: [],
      isLast: false,
      loading: false,
      publishLoading: false,
      submitLoading: false,
      myComment: '',
      myInfo: {},
      comLoading: false,
      isLastComment: false
    };
  },
  created() {
    this.getList();
    let user = localStorage.getItem('phamarcist_user');
    let uer_cookie = getCookie('PHPSESSID');
    if (user && uer_cookie) {
      this.myInfo = JSON.parse(user);
    }
  },
  methods: {
    async publish() {
      if (this.post == '') {
        this.$message.warning('输入不能为空');
        return;
      }
      let userId;
      let userInfo = localStorage.getItem('phamarcist_user');
      let cookie = getCookie('PHPSESSID');
      if (cookie && userInfo) {
        userInfo = JSON.parse(localStorage.getItem('phamarcist_user'));
        userId = userInfo.id;
      } else {
        this.$message.warning('请先登录系统');
        return;
      }
      const payLoad = {
        post: this.post,
        userId
      };
      this.publishLoading = true;
      try {
        const { code } = await _publish(payLoad);
        if (code == 1) {
          this.post = '';
          this.$message.success('发布成功');
          this.getList();
        }
        this.publishLoading = false;
      } catch (error) {
        this.publishLoading = false;
      }
    },
    async getList() {
      this.loading = true;
      try {
        const { code, data } = await _getList(this.params);
        if (code == 1) {
          data &&
            data.data.forEach(item => {
              item.commentVisible = false;
              item.comment = [];
            });
          this.postList = this.postList.concat(data.data || []);
          if (
            (data.current_page - 1) * data.per_page + data.data.length <
            data.total
          ) {
            this.isLast = false;
          } else {
            this.isLast = true;
          }
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
      }
    },
    // 查看更多
    getMore() {
      this.params.page++;
      this.getList();
    },
    async getComment(post) {
      this.comLoading = true;
      // console.log(post);
      post.commentVisible = true;
      try {
        const payLoad = {
          postId: post.id,
          size: 10,
          page: 1
        };
        const { code, data } = await _getComment(payLoad);
        if (code == 1) {
          post.comment = post.comment.concat(data.data || []);
          // console.log(data.data,);
          if (
            (data.current_page - 1) * data.per_page + data.data.length <
            data.total
          ) {
            this.isLastComment = false;
          } else {
            this.isLastComment = true;
          }

          this.comLoading = false;
        }
      } catch (error) {
        this.comLoading = false;
      }
    },
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = 'liked';
    },
    onSearch() {},
    changeTab(type) {
      this.active = type;
      this.params.type = type;
      this.params.page = 1;
      this.postList = [];
      this.getList();
    },
    handleSubmit() {
      console.log(this.myComment);
    }
  }
};
</script>

<style lang="less" scoped>
.community {
  min-width: 1200px;
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 20px;
  display: flex;
  .left-container {
    width: 20%;
    margin-right: 10px;
    height: 600px;
    position: sticky;
    top: 0;
    .ant-card {
      height: 100%;
    }
  }
  .post-container {
    width: 80%;
    .send-message {
      margin-bottom: 20px;
      .publish {
        margin-top: 10px;
        float: right;
      }
    }
    .tab-wrap {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      border: 1px solid #e8e8e8;
      padding: 10px;
      margin-bottom: 10px;
      .tabs {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-left: 20px;
        .tab {
          margin-right: 10px;
          cursor: pointer;
          &:hover {
            color: @theme-color;
          }
          &.active {
            color: @theme-color;
            font-weight: bold;
          }
        }
      }
    }

    .post-message {
      margin-bottom: 10px;
      .comment-btn {
        float: right;
        margin-top: 10px;
      }
      .ant-divider-horizontal {
        margin: 0;
      }
      .all-comment-container {
        padding: 0 40px;
      }
      .ant-empty {
        padding-top: 20px;
      }
    }
    .btn {
      height: 30px;
      line-height: 30px;
      width: 140px;
      text-align: center;
      color: #8597b6;
      background-color: #f7f7f9;
      font-size: 14px;
      border: 1px solid #8597b6;
      margin: 0 auto 20px;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        background-color: #8597b6;
        color: #fff;
      }
    }
  }
}
</style>
