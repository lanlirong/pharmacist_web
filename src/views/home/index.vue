<template>
  <div class="home">
    <!-- 搜索 -->
    <div class="search-container">
      <div class="search-image">
        <svg-icon iconClass="search-image"></svg-icon>
      </div>
      <a-input
        size="large"
        placeholder="请输入药品或疾病名称"
        v-model="searchKey"
      >
      </a-input>
      <a-button size="large" type="primary">搜索</a-button>
    </div>
    <!-- 搜索 -->
    <!-- 入口 -->
    <ul class="item-container">
      <li @click="toSearch('drug')">
        <div class="item-img"><svg-icon iconClass="drug"></svg-icon></div>
        <p class="item-title">药品检索</p>
        <p class="item-des">常见药物的基本信息、药品说明书、主治疾病检索</p>
      </li>
      <li @click="toSearch('interaction')">
        <div class="item-img">
          <svg-icon iconClass="interaction"></svg-icon>
        </div>
        <p class="item-title">药物相互作用</p>
        <p class="item-des">可视化展示药物有效成分之间的相互作用关系</p>
      </li>
      <li @click="toSearch('disease')">
        <div class="item-img"><svg-icon iconClass="disease"></svg-icon></div>
        <p class="item-title">疾病检索</p>
        <p class="item-des">常见疾病的基本信息、常用治疗药物检索</p>
      </li>
      <li @click="toSearch('consult')">
        <div class="item-img"><svg-icon iconClass="consult"></svg-icon></div>
        <p class="item-title">用药咨询</p>
        <p class="item-des">常见疾病的用药咨询及标准化解答</p>
      </li>
      <li @click="toSearch('science')">
        <div class="item-img"><svg-icon iconClass="science"></svg-icon></div>
        <p class="item-title">科普宣教</p>
        <p class="item-des">药学相关信息的科普文章</p>
      </li>
      <!-- <li @click="toSearch('calendar')">
        <div class="item-img"><svg-icon iconClass="calendar"></svg-icon></div>
        <p class="item-title">药历构建</p>
        <p class="item-des">为特殊患者建立药历，可用于慢病管理</p>
      </li>
      <li @click="toSearch('bad-reaction')">
        <div class="item-img">
          <svg-icon iconClass="bad-reaction"></svg-icon>
        </div>
        <p class="item-title">不良反应共建</p>
        <p class="item-des">发布药物不良反应案例，共建不良反应信息库</p>
      </li> -->
      <!-- <li>
        <a-carousel :after-change="onChange">
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
        </a-carousel>
      </li> -->
      <li @click="toSearch('community')">
        <div class="item-img"><svg-icon iconClass="community"></svg-icon></div>
        <p class="item-title">药师社区</p>
        <p class="item-des">发帖、分享、交流</p>
      </li>
      <svg-icon class="city-img" iconClass="city" />
    </ul>
    <!-- 入口 -->
    <div class="card-container">
      <!-- 热门帖子 卡片 -->
      <hot-post />
      <!--热门文章 卡片 -->
      <hot-article />
    </div>
  </div>
</template>

<script>
import hotArticle from './hot-article';
import hotPost from './hot-post';
export default {
  name: 'Home',
  components: { hotArticle, hotPost },
  data() {
    return {
      searchKey: ''
    };
  },
  mounted() {},
  methods: {
    toSearch(path) {
      let routeData = this.$router.resolve('/' + path);
      window.open(routeData.href, '_blank');
    },
    onChange(a, b, c) {
      console.log(a, b, c);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px 80px;
  .search-container {
    width: 60%;
    height: 40px;
    max-width: 800px;
    min-width: 400px;
    padding-top: 60px;
    padding-bottom: 60px;
    margin: 0 auto;
    display: flex;
    .search-image {
      height: 80px;
      width: 100px;
      margin-right: 20px;
      align-self: center;
      .svg-icon {
        width: 100px;
        height: 80px;
        transform: rotateY(180deg);
      }
    }
    .ant-input {
      font-size: 14px;
    }
    .ant-btn {
      width: 100px;
      font-size: 14px;
    }
  }
  .item-container {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 90px;
    margin-bottom: 0;
    li {
      width: 350px;
      margin-top: 20px;
      background-color: #fff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: @border;
      text-align: center;
      padding: 20px 20px 40px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.4s;
      z-index: 9;
      .item-img {
        display: flex;
        align-items: center;
        .svg-icon {
          width: 60px;
          height: 60px;
        }
      }
      .item-title {
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 20px;
        margin-top: 20px;
      }
      .item-des {
        font-size: 14px;
        line-height: 20px;
      }
      &:hover {
        transform: scale(1.02);
        border: 1px solid @theme-color;
      }
    }
    .city-img {
      position: absolute;
      right: -110px;
      bottom: 0;
      z-index: 1;
      transform: rotateY(180deg);
    }
  }
  .card-container {
    display: flex;
    width: 100%;
    .hot-post {
      margin-right: 20px;
      flex: 1;
    }
  }
}
</style>
