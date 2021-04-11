<template>
  <div class="detail-container article">
    <loading v-if="loading" tip="数据加载中..." size="large" />
    <h2>
      {{ article.title | placeholder }}
    </h2>
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

<style lang="less" scoped>
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

  h2 {
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
  }
}
</style>
