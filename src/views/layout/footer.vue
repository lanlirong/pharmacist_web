<template>
  <div class="footer">
    <p><svg-icon iconClass="email" />联系我们:2831265488@qq.com</p>
    <p><svg-icon iconClass="address" />地址：南京市龙眠大道639号中国药科大学</p>
    <p>Copyright © 2020-2021CPU All Rights Reserved</p>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  min-width: 1200px;
  height: 150px;
  background-color: @bg-color;
  border-top: @border;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: 12px;
    line-height: 25px;
    .svg-icon {
      width: 18px;
      height: 18px;
      line-height: 25px;
      margin-right: 6px;
    }
  }
}
</style>
