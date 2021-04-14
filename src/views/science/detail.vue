<template>
  <div class="detail-container article">
    <loading v-if="loading" tip="数据加载中..." size="large" />
    <h1>
      {{ article.title | placeholder }}
    </h1>
    <div class="info">
      <p>作者：{{ article.creator }}</p>
      <p>最后修改于：{{ article.updateTime }}</p>
    </div>

    <div class="content" v-html="article.content"></div>
  </div>
</template>

<script>
import { _getOne } from '@/services/api/science';
export default {
  data() {
    return {
      article: {
        id: '',
        name: '',
        introduction: '',
        crowd: '',
        contagion: '',
        complication: '',
        treatWay: '',
        cycle: '',
        rate: '',
        drug: []
      },
      loading: false
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.loading = true;
      try {
        const { data } = await _getOne({ id: this.$route.query.id });
        this.article = data;
        console.log(this.article);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less">
.detail-container {
  width: 1200px;
  margin: 20px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .content {
    img {
      width: 100%;
    }
    p {
      line-height: 20px;
    }
  }

  h1 {
    width: 100%;
    // margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    color: @theme-color-1;
    text-align: center;
    position: relative;
  }
  .info {
    line-height: 18px;
    color: #999;
    font-size: 12px;
    margin: 10px auto;
    text-align: center;
  }
  .content {
    width: 100%;
    line-height: 1.5em;
    blockquote {
      border-left: 4px solid #ccc;
      margin-bottom: 5px;
      margin-top: 5px;
      padding-left: 16px;
    }
    ol {
      padding-left: 1.5em;
      li {
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8
          list-9;
        counter-increment: list-0;
      }
      li:not(.ql-direction-rtl)::before {
        margin-left: -1.5em;
        margin-right: 0.3em;
        text-align: right;
      }
      li:before {
        content: counter(list-0, decimal) '. ';
        display: inline-block;
        white-space: nowrap;
        width: 1.2em;
      }
    }
    ul {
      padding-left: 1.5em;
      li:not(.ql-direction-rtl)::before {
        content: '\2022';
        margin-left: -1.5em;
        margin-right: 0.3em;
        text-align: right;
        display: inline-block;
        white-space: nowrap;
        width: 1.2em;
      }
      li:not(.ql-direction-rtl) {
        padding-left: 1.5em;
      }
    }
    .ql-indent-1 {
      padding-left: 3em;
    }
    .ql-indent-2 {
      padding-left: 6em;
    }
    .ql-indent-3 {
      padding-left: 9em;
    }
    .ql-indent-4 {
      padding-left: 12em;
    }
    .ql-indent-5 {
      padding-left: 15em;
    }
    h2 {
      font-weight: 700;
      font-size: 18px;
    }
    h3 {
      font-weight: 500;
      font-size: 16px;
    }
    h4 {
      font-weight: 400;
      font-size: 14px;
    }
    img {
      width: unset;
      max-width: 100%;
    }
  }
}
</style>
