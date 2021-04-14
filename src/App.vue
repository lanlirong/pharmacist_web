<template>
  <div id="app">
    <Header />
    <div id="main">
      <router-view />
    </div>
    <Footer />
    <!-- 返回顶部 -->
    <a-back-top />
    <message />
  </div>
</template>

<script>
import Header from '@/views/layout/header.vue';
import Footer from '@/views/layout/footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  color: @text-color;
  font-size: 14px;
  #main {
    flex: 1;
    width: 100%;
    min-width: 1200px;
    background-color: @bg-color;
  }
}
</style>
