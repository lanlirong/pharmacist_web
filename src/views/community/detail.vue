<template>
  <div class="community">
    <div class="left-container">
      <a-card>
        <p style="text-align:center;">你可能感兴趣的帖子</p>
        <br />
        <br />

        <a-empty description="暂无数据"
      /></a-card>
    </div>
    <div class="post-container">
      <!-- 帖子 -->
      <loading v-if="loading" tip="数据加载中..." size="large" />
      <div v-else>
        <a-card class="post-message">
          <div class="post-item">
            <a-comment>
              <template slot="actions">
                <!-- 喜欢 -->
                <span key="comment-basic-like">
                  <a-tooltip title="喜欢">
                    <a-icon
                      type="like"
                      :theme="post.myLike ? 'filled' : 'outlined'"
                      @click="changeLike()"
                    />
                  </a-tooltip>
                  <span style="padding-left: '8px';cursor: 'auto'">
                    {{ post.like.length }}
                  </span>
                </span>
                <!--  留言-->
                <span key="comment-basic-reply-to">
                  <a-icon type="message" theme="outlined" /><span
                    style="padding-left: '8px';cursor: 'auto'"
                  >
                    {{ post.commentTotal }}
                  </span></span
                >
              </template>
              <a slot="author">{{ post.name }}</a>
              <a-avatar slot="avatar" :src="post.avatar" alt="Han Solo" />
              <p slot="content">
                <span>{{ post.post }}</span>
              </p>
              <template slot="datetime" :title="post.createTime">
                <span>{{ post.createTime }}</span>
              </template>
            </a-comment>
            <div class="all-comment-container">
              <a-divider />
              <!-- 添加评论 -->
              <a-comment>
                <a-avatar slot="avatar" :src="myInfo.avatar" alt="Han Solo" />
                <div slot="content">
                  <a-textarea :rows="2" v-model="post.myComment" />
                  <a-button
                    class="comment-btn"
                    html-type="submit"
                    :loading="submitLoading"
                    type="primary"
                    @click="addComment()"
                  >
                    添加评论
                  </a-button>
                </div>
              </a-comment>
              <a-divider />
              <!-- 所有评论 -->
              <a-empty
                v-if="!comLoading && post.comment.length == 0"
                description="暂无评论"
              />
              <!-- <loading v-if="comLoading" tip="数据加载中..." size="large" /> -->

              <a-comment v-for="(item, index) in post.comment" :key="index">
                <template slot="datetime" :title="item.createTime">
                  <span>{{ item.createTime }}</span>
                </template>
                <a-avatar slot="avatar" :src="item.avatar" alt="Han Solo" />
                <a slot="author">{{ item.name }}</a>
                <p slot="content">
                  {{ item.content }}
                  <span class="icon-container">
                    <a-tooltip title="回复">
                      <a-icon
                        class="icon"
                        type="message"
                        theme="outlined"
                        @click="showModal(post, item)"
                      />
                    </a-tooltip>
                    <a-popconfirm
                      title="确定删除该条评论？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="deleteComment(post, item)"
                    >
                      <a-tooltip title="删除">
                        <a-icon
                          v-if="item.userId == myInfo.id"
                          class="icon"
                          type="delete"
                        />
                      </a-tooltip> </a-popconfirm
                  ></span>
                </p>
                <a-comment
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                >
                  <!-- <span slot="actions">Reply to {{ child.replyToName }}</span> -->
                  <a-avatar slot="avatar" :src="child.avatar" alt="Han Solo" />
                  <a slot="author">{{ child.name }}</a>
                  <template slot="datetime" :title="child.createTime">
                    <span>{{ child.createTime }}</span>
                  </template>
                  <p slot="content">
                    <span> {{ child.content }}</span>
                    <span class="icon-container">
                      <a-tooltip title="回复">
                        <a-icon
                          class="icon"
                          type="message"
                          theme="outlined"
                          @click="showModal(post, item)"
                        />
                      </a-tooltip>
                      <a-popconfirm
                        title="确定删除该条评论？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="deleteComment(post, item)"
                      >
                        <a-tooltip title="删除">
                          <a-icon
                            v-if="child.userId == myInfo.id"
                            class="icon"
                            type="delete"
                          />
                        </a-tooltip> </a-popconfirm
                    ></span>
                  </p>
                </a-comment>
              </a-comment>
              <div v-if="!isLastComment">更多评论</div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
    <!-- 回复弹框 -->
    <a-modal
      :title="'回复' + currentReply"
      :visible="modelVisible"
      :confirm-loading="confirmLoading"
      okText="确认"
      cancelText="取消"
      :destroyOnClose="true"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-textarea v-model="reply" placeholder="回复" auto-size />
    </a-modal>
  </div>
</template>

<script>
import {
  _changeLike,
  _addComment,
  _deleteComment,
  _getDetail
} from '@/services/api/post';
import { getCookie } from '@/utils/tool.js';
export default {
  data() {
    return {
      action: null,
      active: 2,
      post: null,
      isLast: false,
      loading: false,
      submitLoading: false,
      myInfo: {},
      comLoading: false,
      isLastComment: false,
      params: {
        id: '',
        size: 10,
        page: 1
      },
      // 弹框
      modelVisible: false,
      confirmLoading: false,
      reply: '',
      currentReply: '',
      currentReplyId: '',
      currentPost: '',
      currentCommentId: ''
    };
  },
  created() {
    this.getDetail();
    let user = localStorage.getItem('phamarcist_user');
    let uer_cookie = getCookie('PHPSESSID');
    if (user && uer_cookie) {
      this.myInfo = JSON.parse(user);
    }
  },
  methods: {
    async getDetail() {
      let id = this.$route.query.id;
      if (id == '') {
        this.$message.error('缺少必要参数');
        return;
      }
      this.params.id = id;
      this.loading = true;
      try {
        const { code, data } = await _getDetail(this.params);
        if (code == 1) {
          this.post = data || {};
          if (
            (this.post.comment.current_page - 1) * this.post.comment.per_page +
              this.post.comment.data.length <
            this.post.comment.total
          ) {
            this.isLastComment = false;
          } else {
            this.isLastComment = true;
          }

          this.post.comment = this.post.comment.data;
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
      }
    },
    async changeLike(post) {
      if (post.myLike) {
        post.like.splice(post.like.indexOf(String(this.myInfo.id)), 1);
      } else {
        post.like.push(String(this.myInfo.id));
      }
      const { code } = await _changeLike({
        like: post.like.join(','),
        id: post.id
      });
      if (code == 1) {
        post.myLike = !post.myLike;
      }
    },

    // 添加评论
    async addComment(post) {
      const { id, myComment } = post;
      if (myComment == '') {
        this.$message.error('内容不能为空');
        return;
      }
      const payLoad = {
        postId: id,
        userId: this.myInfo.id,
        content: myComment,
        replyTo: 0,
        commentId: ''
      };
      const { code, data } = await _addComment(payLoad);
      if (code == 1) {
        this.$message.success('添加评论成功');
        post.comment = [];
        post.myComment = '';
        this.getDetail();
      }
    },
    async deleteComment(post, item) {
      const { id, replyTo, postId } = item;
      const payLoad = {
        id,
        replyTo,
        postId
      };
      const { code } = await _deleteComment(payLoad);
      if (code == 1) {
        this.$message.success('删除成功');
        post.comment = [];
        this.getDetail();
      }
    },
    showModal(post = {}, item = {}) {
      this.currentReply = item.name;
      this.currentReplyId = item.userId;
      this.currentCommentId = item.id;
      this.modelVisible = true;
      this.currentPost = post;
    },
    async handleOk(e) {
      this.confirmLoading = true;
      if (this.reply == '') {
        this.$message.error('内容不能为空');
        this.modelVisible = false;
        this.confirmLoading = false;
        return;
      }
      const payLoad = {
        postId: this.currentPost.id,
        userId: this.myInfo.id,
        content: this.reply,
        replyTo: this.currentReplyId,
        commentId: this.currentCommentId
      };
      const { code, data } = await _addComment(payLoad);
      if (code == 1) {
        this.$message.success('添加评论成功');
        this.currentPost.comment = [];
        this.getDetail();
        this.modelVisible = false;
        this.confirmLoading = false;
      }
    },
    handleCancel(e) {
      this.modelVisible = false;
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
      .ant-comment-content-detail p {
        cursor: pointer;
        padding-top: 5px;
        padding-bottom: 5px;

        .icon-container {
          width: 80px;
          display: none;
          .icon {
            margin-left: 10px;
          }
        }
        &:hover {
          background-color: #f7f7f9;
          .icon-container {
            display: inline;
          }
        }
      }
      // .ant-comment-content-detail p.line3 {
      //   display: -webkit-box;
      //   -webkit-box-orient: vertical;
      //   -webkit-line-clamp: 3;
      //   overflow: hidden;
      //   cursor: pointer;
      // }
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
  .expand {
    color: @theme-color;
    cursor: pointer;
  }
}
</style>
