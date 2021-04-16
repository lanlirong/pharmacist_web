<template>
  <div class="hot-article">
    <div class="title-container">
      <div class="line"></div>
      <span>热门文章<svg-icon iconClass="article"/></span>
    </div>
    <a-card style="width:400px">
      <div>
        <a-list item-layout="horizontal" :data-source="list">
          <a-list-item slot="renderItem" slot-scope="item">
            <router-link :to="`science/detail?id=${item.id}`" target="_blank">
              <a-list-item-meta :description="item.description">
                <a slot="title">{{ item.title }}</a>
              </a-list-item-meta>
            </router-link>
          </a-list-item>
        </a-list>
      </div>
    </a-card>
  </div>
</template>
<script>
import { _getHotList } from '@/services/api/science.js';
const data = [];
export default {
  data() {
    return {
      data,
      list: []
    };
  },
  mounted() {
    this.getHotList();
  },
  methods: {
    async getHotList() {
      const { data, code } = await _getHotList();
      this.list = data || [];
    }
  }
};
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
