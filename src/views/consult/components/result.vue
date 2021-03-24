<template>
  <div class="consult-result">
    <div class="download">
      <span class="total-text">共查询到{{ total }}条数据</span>
    </div>
    <div class="list">
      <!-- loading -->
      <loading v-if="dataLoading" tip="加载中" />
      <ul v-if="dataList.length > 0">
        <li v-for="(item, index) in dataList" :key="index">
          <router-link :to="`/consult/detail?id=${item.id}`" target="_blank">
            <div class="title">
              {{ (page - 1) * size + index + 1 + '、'
              }}<span v-html="redText(item.Q_content)"></span>
            </div>
            <div class="content" v-html="redText(item.Q_answer)"></div>
          </router-link>
        </li>
      </ul>
      <div v-else><a-list :data-source="[]" /></div>
      <a-pagination
        :pageSize="size"
        :total="total"
        :showTotal="
          (total, range) => `第${range[0]}-${range[1]}条 / 共${total}条 `
        "
        show-less-items
        @change="pageChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchKey: {
      type: [String, Number],
      default: ''
    },
    dataLoading: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: Number,
      default: 20
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    redText(val) {
      val = val + '';
      if (this.searchKey !== '') {
        return val.replace(
          this.searchKey,
          '<font color="red">' + this.searchKey + '</font>'
        );
      } else {
        return val;
      }
    },
    pageChange(page) {
      const searchForm = { page, size: this.size };
      this.$emit('pageChange', searchForm);
    }
  }
};
</script>

<style lang="less" scoped>
.consult-result {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: @border;
  background-color: #fff;
  padding: 20px;
  box-shadow: @box-shadow;

  .download {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background-color: #f7f8fc;
    border: @border;
    span {
      color: @theme-color;
      padding: 0 5px;
    }
    .total-text {
      float: right;
    }
  }
  .list {
    flex: 1;
    min-height: 160px;
    position: relative;
    li {
      padding: 20px;
      border-bottom: @border;
      line-height: 20px;

      .title {
        padding-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .content {
        color: @text-color;
        text-indent: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      &:hover {
        background-color: @hover-bg-color;
      }
    }
    .ant-pagination {
      float: right;
      margin-top: 20px;
    }
  }
}
</style>
