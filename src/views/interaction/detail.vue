<template>
  <div class="detail">
    <div class="left">
      <h2>相互作用关系概览</h2>
      <!-- 关系图 -->
      <!-- :style="{ height: height + 40 + 'px' }" -->
      <div class="graph-container">
        <loading v-if="graphLoading" tip="数据加载中..." />
        <graph v-if="graphData.id" :height="height" :graphData="graphData" />
      </div>
    </div>
    <div class="right">
      <h2>详情<span>(点击方框查看)</span></h2>
      <!-- 详情 -->
      <div class="info-container">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import graph from './components/graph';
import { _getOne } from '@/services/api/interaction';
export default {
  components: {
    graph
  },
  data() {
    return {
      graphLoading: false,
      height: 500,
      graphData: {}
    };
  },
  mounted() {
    this.getOne();
  },
  methods: {
    async getOne() {
      this.graphLoading = true;
      try {
        const { data } = await _getOne({ name: this.$route.query.name });
        this.graphData = this.handleData(data);
        this.height = data.length * 120;
        this.graphLoading = false;
      } catch (error) {
        this.graphLoading = false;
      }
    },
    handleData(data) {
      let node = {
        id: 'id0',
        label: this.$route.query.name
      };
      let children = [];
      data.forEach(item => {
        let temp = {};
        temp.id = item.id;
        if (item.interaction.length > 16)
          item.interaction = item.interaction.substr(0, 16) + '...';
        if (item.result.length > 16)
          item.result = item.result.substr(0, 20) + '...';
        temp.label = item.interaction;
        temp.description = item.result;
        children.push(temp);
      });
      node.children = children;
      return node;
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 1200px;
  display: flex;
  justify-content: center;
  //   align-items: center;
  margin: 20px auto;
  h2 {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 15px;
    border-left: 3px solid red;
    padding-left: 10px;
    span {
      font-size: 12px;
      color: #aaa;
      padding-left: 5px;
    }
  }
  .left {
    width: 800px;
    height: calc(100vh - 100px);

    .graph-container {
      background-color: #fff;
      width: 800px;
      min-height: 500px;
      height: 100%;
      overflow: hidden;
      padding: 20px;
      position: relative;
      border: @border;
      border-radius: 8px;
    }
  }
  .right {
    flex: 1;
    margin-left: 20px;

    .info-container {
      li {
        margin-bottom: 20px;
        border-radius: 8px;
        background-color: #fff;
        height: 100px;
        padding: 10px;
        box-shadow: @box-shadow;
        border: @border;
      }
    }
  }
}
</style>
