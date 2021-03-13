<template>
  <div class="page-404">
    <img src="@/assets/images/404.png" />
    <span>抱歉，您访问的资源没有找到</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 40%;
    margin-top: 20px;
  }
  span {
    color: @text-color;
    display: block;
    margin: 20px 20px 40px;
    font-size: 16px;
  }
}
</style>
