<template>
  <div class="disease-result">
    <span class="total-text">共查询到{{ total }}条数据</span>
    <div class="list">
      <div class="list-container">
        <a-card>
          <div>
            <a-list item-layout="horizontal" :data-source="tableList">
              <a-list-item slot="renderItem" slot-scope="item">
                <router-link
                  :to="`/science/detail?id=${item.id}`"
                  target="_blank"
                >
                  <a-list-item-meta :description="item.description">
                    <span slot="title" v-html="redText(item.title)"></span>
                  </a-list-item-meta>
                  <p class="info">
                    <span>{{ item.creator }}</span>
                    <span>{{ item.updateTime }}</span>
                  </p>
                </router-link>
              </a-list-item>
            </a-list>
          </div>
          <a-pagination
            :pageSize="size"
            :total="total"
            :showTotal="
              (total, range) => `第${range[0]}-${range[1]}条 / 共${total}条 `
            "
            show-less-items
            @change="pageChange"
          />
        </a-card>
      </div>
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
    tableLoading: {
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
    tableList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
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
.disease-result {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: @border;
  background-color: #fff;
  padding: 20px;
  box-shadow: @box-shadow;
  .total-text {
    text-align: right;
  }
  .list-container {
    margin-top: 20px;
    .info {
      text-align: right;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      margin-top: 5px;
      span {
        margin-left: 20px;
      }
    }
    .ant-list-items {
      a {
        width: 100%;
      }
    }
    .ant-list-item-meta-title {
      font-weight: 700;
    }
    .ant-list-split .ant-list-item:last-child {
      border-bottom: @border;
    }
    .ant-pagination {
      float: right;
      margin-top: 20px;
    }
  }
}
</style>
