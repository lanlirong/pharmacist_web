<template>
  <div class="hot-post">
    <div class="title-container">
      <div class="line"></div>
      <span>热门帖子<svg-icon iconClass="post"/></span>
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
                <a-tooltip title="喜欢">
                  <a-icon
                    type="like"
                    :theme="post.myLike ? 'filled' : 'outlined'"
                    @click="changeLike(post)"
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
            <p slot="content" @click="toDetail(post.id)">
              <span v-if="!post.expand && post.post.length > 100"
                >{{ post.post.slice(0, 100) }}...
                <em class="expand" @click="expand($event, post)">展开</em></span
              >
              <span v-else>{{ post.post }}</span>
            </p>
            <template slot="datetime" :title="post.createTime">
              <span>{{ post.createTime }}</span>
            </template>
          </a-comment>
        </div>
      </a-card>
    </div>
  </div>
</template>
<script>
import { _getList, _changeLike } from '@/services/api/post';
import { getCookie } from '@/utils/tool.js';

export default {
  data() {
    return {
      loading: false,
      postList: [],
      params: {
        size: 5,
        page: 1,
        type: 2,
        searchKey: ''
      },
      myInfo: {}
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
    async getList() {
      this.loading = true;
      try {
        const { code, data } = await _getList(this.params);
        if (code == 1) {
          data &&
            data.data.forEach(item => {
              item.commentVisible = false;
              item.expand = false;
              item.comment = [];
              item.myComment = '';
              item.like = item.like.split(',');
              item.myLike =
                item.like.indexOf(String(this.myInfo.id)) > -1 ? true : false;
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
    expand(e, post) {
      e.stopPropagation();
      post.expand = true;
    },
    toDetail(id) {
      // this.$router.push('/community/detail');
      window.open(`/#/community/detail?id=${id}`);
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
  .expand {
    color: @theme-color;
    cursor: pointer;
  }
}
</style>
