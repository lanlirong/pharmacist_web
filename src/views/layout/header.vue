<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/images/logo.png" />
      </router-link>
    </div>
    <ul class="menu">
      <li><svg-icon icon-class="mini" />小程序</li>
      <li><svg-icon icon-class="login" />登录/注册</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  min-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  color: @text-color;
  font-size: 14px;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: @border;
  .logo {
    height: 50px;
    img {
      height: 100%;
    }
  }
  .menu {
    display: flex;
    flex-direction: row;
    .svg-icon {
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 5px;
    }
    li {
      margin-left: 20px;
    }
  }
}
</style>
