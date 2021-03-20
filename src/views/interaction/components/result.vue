<template>
  <div class="drug-result">
    <div class="header">
      <span class="total-text">共查询到{{ tableList.length || 0 }}条数据</span>
    </div>
    <div class="list">
      <a-table
        :data-source="tableList"
        :loading="tableLoading"
        :rowKey="row => row.name"
        :pagination="pagination"
      >
        <a-table-column
          title="药物名称"
          key="name"
          :width="200"
          :ellipsis="true"
          ><template slot-scope="{ name }">
            <router-link
              :to="`/interaction/detail?name=${name}`"
              target="_blank"
              >{{ name | placeholder }}</router-link
            >
          </template></a-table-column
        >
        <a-table-column
          title="相互作用成分汇总"
          data-index="interaction"
          key="interaction"
          :ellipsis="true"
          ><template slot-scope="interaction">{{
            interaction | placeholder
          }}</template></a-table-column
        >
        <a-table-column :width="150" key="action">
          <template slot-scope="{ name }">
            <router-link
              :to="`/interaction/detail?name=${name}`"
              target="_blank"
            >
              <a-button type="link">作用详情</a-button>
            </router-link>
          </template></a-table-column
        >
      </a-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tableLoading: {
      type: Boolean,
      default: false
    },
    tableList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    pagination() {
      return {
        total: this.tableList.length,
        showTotal: (total, range) =>
          `第${range[0]}-${range[1]}条 / 共${total}条 `,
        pageSize: 10
      };
    }
  },
  mounted() {},
  methods: {
    // handleTableChange(pagination) {
    //   const { current, pageSize } = pagination;
    //   const searchForm = {};
    //   searchForm.page = current;
    //   searchForm.size = pageSize;
    //   this.$emit('tableChange', searchForm);
    // }
  }
};
</script>

<style lang="less" scoped>
.drug-result {
  border: @border;
  background-color: #fff;
  padding: 20px;
  box-shadow: @box-shadow;
  .header {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background-color: #f7f8fc;
    border: @border;
    span {
      float: right;
      color: @theme-color;
      padding: 0 5px;
    }
  }
  .list {
    flex: 1;
    .ant-btn {
      padding: 0 10px;
    }
    a {
      color: @text-link;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
