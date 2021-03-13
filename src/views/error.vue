<template>
  <div class="page-error">
    <img src="@/assets/images/error.png" />
    <span>页面出现未知错误</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.page-error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 50%;
    margin-top: 20px;
  }
  span {
    color: @text-color;
    display: block;
    margin: 0 20px 40px;
  }
}
</style>
