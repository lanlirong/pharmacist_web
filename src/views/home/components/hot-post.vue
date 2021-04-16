<template>
  <div class="hot-post">
    <div class="title-container">
      <div class="line"></div>
      <span>热门帖子<svg-icon iconClass="post"/></span>
    </div>
    <a-card>
      <div class="post-item" v-for="item in [1, 2, 3, 4]" :key="item">
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
                {{ likes }}
              </span>
            </span>
            <span key="comment-basic-dislike">
              <a-tooltip title="Dislike">
                <a-icon
                  type="dislike"
                  :theme="action === 'disliked' ? 'filled' : 'outlined'"
                  @click="dislike"
                />
              </a-tooltip>
              <span style="padding-left: '8px';cursor: 'auto'">
                {{ dislikes }}
              </span>
            </span>
            <span key="comment-basic-reply-to">Reply to</span>
          </template>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p slot="content">
            此功能开发中。。。
          </p>
          <a-tooltip
            slot="datetime"
            :title="moment().format('YYYY-MM-DD HH:mm:ss')"
          >
            <span>{{ moment().fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </div>
    </a-card>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      likes: 0,
      dislikes: 0,
      action: null,
      moment
    };
  },
  methods: {
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = 'liked';
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = 'disliked';
    }
  }
};
</script>
<style lang="less" scoped>
.hot-post {
  .title-container {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    .line {
      width: 4px;
      height: 20px;
      margin-right: 10px;
      background-color: red;
    }
    span {
      font-size: 16px;
      color: @theme-color;
      .svg-icon {
        width: 18px;
        height: 18px;
        margin-left: 5px;
      }
    }
  }
  .post-item:not(:last-child) {
    border-bottom: @border;
  }
}
</style>
