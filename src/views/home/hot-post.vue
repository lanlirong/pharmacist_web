<template>
  <div class="hot-post">
    <div class="title-container">
      <div class="line"></div>
      <span>热门帖子<svg-icon iconClass="post"/></span>
    </div>
    <a-card>
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
}
</style>
