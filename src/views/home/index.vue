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
    <!-- 入口 -->
    <ul class="item-container">
      <li>
        <div class="item-img"><svg-icon iconClass="drug"></svg-icon></div>
        <p class="item-title">药品检索</p>
        <p class="item-des">常见药物的基本信息、药品说明书、主治疾病检索</p>
      </li>
      <li>
        <div class="item-img">
          <svg-icon iconClass="interaction"></svg-icon>
        </div>
        <p class="item-title">药物相互作用</p>
        <p class="item-des">可视化展示药物有效成分之间的相互作用关系</p>
      </li>
      <li>
        <div class="item-img"><svg-icon iconClass="disease"></svg-icon></div>
        <p class="item-title">疾病检索</p>
        <p class="item-des">常见疾病的基本信息、常用治疗药物检索</p>
      </li>
      <li>
        <div class="item-img"><svg-icon iconClass="consult"></svg-icon></div>
        <p class="item-title">用药咨询</p>
        <p class="item-des">常见疾病的用药咨询及标准化解答</p>
      </li>
      <li>
        <div class="item-img"><svg-icon iconClass="science"></svg-icon></div>
        <p class="item-title">科普宣教</p>
        <p class="item-des">药学相关信息的科普文章</p>
      </li>
      <li>
        <div class="item-img"><svg-icon iconClass="calendar"></svg-icon></div>
        <p class="item-title">药历构建</p>
        <p class="item-des">为特殊患者建立药历，可用于慢病管理</p>
      </li>
      <li>
        <div class="item-img">
          <svg-icon iconClass="bad-reaction"></svg-icon>
        </div>
        <p class="item-title">不良反应共建</p>
        <p class="item-des">发布药物不良反应案例，共建不良反应信息库</p>
      </li>
      <li>
        <div class="item-img"><svg-icon iconClass="community"></svg-icon></div>
        <p class="item-title">药师社区</p>
        <p class="item-des">发帖、分享、交流</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { _recommend } from "@/services/api/consult.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      searchKey: ""
    };
  },
  mounted() {
    this.getrecommend();
  },
  methods: {
    async getrecommend() {
      const data = await _recommend({});
      console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
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
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    li {
      width: 270px;
      // height: 200px;
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
  }
}
</style>
