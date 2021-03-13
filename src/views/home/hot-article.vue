<template>
  <div class="hot-article">
    <div class="title-container">
      <div class="line"></div>
      <span>热门文章<svg-icon iconClass="article"/></span>
    </div>
    <a-card style="width:400px">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.hot-article {
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
}
</style>
