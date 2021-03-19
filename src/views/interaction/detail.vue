<template>
  <div class="detail">
    <!-- 关系图 -->
    <div class="graph-container">
      <graph />
    </div>
    <!-- 详情 -->
    <div class="info-container">2</div>
  </div>
</template>

<script>
import graph from './components/graph';
export default {
  components: {
    graph
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  .graph-container {
    width: 800px;
    height: 100%;
    padding: 20px;
    background-color: #fff;
  }
  .info-container {
    flex: 1;
    padding: 20px;
    margin-left: 20px;
    background-color: #fff;
  }
}
</style>
