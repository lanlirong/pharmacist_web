<template>
  <div class="drug">
    <!-- 搜索区域 -->
    <div class="search-container">
      <!-- 搜索框 -->
      <div class="input-container">
        <a-input
          size="large"
          placeholder="请输入药品或疾病名称"
          v-model="searchKey"
        >
        </a-input>
        <a-button size="large">搜索</a-button>
      </div>
      <!-- 高级搜索 -->
      <div class="senior-input-container"></div>
    </div>
    <!-- 搜索区域 -->
  </div>
</template>

>
<script>
export default {
  data() {
    return {
      searchKey: ''
    };
  }
};
</script>

<style lang="less" scoped>
.drug {
  min-width: 1200px;
  margin: 0 auto;
  //   padding: 0 20px 40px;
  .search-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: @theme-color;
    opacity: 0.7;
    position: sticky;
    // top: 0;
    // left: 0;
    .input-container {
      width: 1200px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #fff;
      .ant-input {
        width: 60%;
      }
    }
    .senior-input-container {
      height: 150px;
      width: 1200px;
      border: 1px solid #fff;
    }
  }
}
</style>
