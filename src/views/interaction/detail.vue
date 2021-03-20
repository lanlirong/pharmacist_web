<template>
  <div class="detail">
    <div class="left">
      <h2>相互作用关系概览——{{ graphData.label }}</h2>
      <!-- 关系图 -->
      <!-- :style="{ height: height + 40 + 'px' }" -->
      <div class="graph-container">
        <loading v-if="graphLoading" tip="数据加载中..." />
        <graph
          v-if="graphData.id"
          :height="height"
          :graphData="graphData"
          @clickNode="clickNode"
        />
      </div>
    </div>
    <div class="right">
      <h2>详情<span>(点击左侧卡片查看)</span></h2>
      <!-- 详情 -->
      <div class="info-container">
        <detail-card v-if="Object.keys(cardData).length > 0" :data="cardData" />
        <a-empty v-else />
      </div>
    </div>
  </div>
</template>

<script>
import graph from './components/graph';
import detailCard from './components/detail-card';
import { _getOne } from '@/services/api/interaction';
export default {
  components: {
    graph,
    detailCard
  },
  data() {
    return {
      graphLoading: false,
      height: 500,
      graphData: {},
      cardData: {}
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
        let temp = { ...item };
        temp.id = item.id;
        if (item.interaction.length > 16)
          item.interaction = item.interaction.substr(0, 18) + '...';
        if (item.result.length > 16)
          item.result = item.result.substr(0, 22) + '...';
        temp.label = item.interaction;
        temp.description = item.result;
        children.push(temp);
      });
      node.children = children;
      return node;
    },
    clickNode(data) {
      data.references = data.references.filter(item => {
        return item !== '';
      });
      this.cardData = data;
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 1200px;
  display: flex;
  justify-content: center;
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
    // margin-right: 400px;
    .graph-container {
      background-color: #fff;
      width: 800px;
      min-height: 500px;
      padding: 20px;
      position: relative;
      border: @border;
      border-radius: 8px;
    }
  }
  .right {
    flex: 1;
    margin-left: 20px;
    height: calc(100vh - 60px);
    position: sticky;
    top: 0;
    .info-container {
      height: 100%;
      overflow: scroll;
      padding-bottom: 20px;

      .ant-empty {
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
</style>
