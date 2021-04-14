<template>
  <div class="hot-article">
    <div class="title-container">
      <div class="line"></div>
      <span>热门文章<svg-icon iconClass="article"/></span>
    </div>
    <a-card style="width:400px">
      <div>
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
              description="Ant Design, a design language for background applications, is refined by Ant UED Team,"
            >
              <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-card>
  </div>
</template>
<script>
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];
export default {
  data() {
    return {
      data
    };
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
