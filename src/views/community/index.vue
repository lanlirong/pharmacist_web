<template>
  <div class="community">
    <!--  -->
    <a-card class="send-message">
      <a-textarea v-model="post" placeholder="发表点你的观点吧..." :rows="4" />
      <a-button class="publish" type="primary" @click="publish">发布</a-button>
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
    <a-card class="post-message" v-for="(post, index) in postList" :key="index">
      <div class="post-item">
        <a-comment>
          <template slot="actions">
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
            <span key="comment-basic-reply-to">
              <a-icon type="mail" theme="outlined" @click="getMsg" /><span
                style="padding-left: '8px';cursor: 'auto'"
              >
                {{ Math.floor(Math.random() * 10) }}
              </span></span
            >
          </template>
          <a slot="author">{{ post.name }}</a>
          <a-avatar slot="avatar" :src="post.avatar" alt="Han Solo" />
          <p slot="content">
            {{ post.post }}
          </p>
          <a-tooltip slot="datetime" :title="post.createTime">
            <span>{{ post.createTime }}</span>
          </a-tooltip>
        </a-comment>
      </div>
    </a-card>
  </div>
</template>

<script>
import { _publish, _getList } from '@/services/api/post';
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
      postList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async publish() {
      if (this.post == '') {
        this.$message.warning('输入不能为空');
        return;
      }
      let userId;
      let userInfo = localStorage.getItem('phamarcist_user');
      if (userInfo) {
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
      const { code } = await _publish(payLoad);
      if (code == 1) {
        this.post = '';
        this.$message.success('发布成功');
        this.getList();
      }
    },
    async getList() {
      const { code, data } = await _getList(this.params);
      if (code == 1) {
        this.postList = data.data || [];
        console.log(this.postList);
      }
    },
    getMsg() {},
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = 'liked';
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = 'disliked';
    },
    onSearch() {},
    changeTab(type) {
      this.active = type;
      this.params.type = type;
      this.getList();
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
  }
}
</style>
