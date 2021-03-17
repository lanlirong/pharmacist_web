<template>
  <div class="drug-result">
    <!-- 结果过滤 -->
    <div class="filter">
      <result-filter />
    </div>
    <!--结果列表 -->
    <div class="main">
      <div class="download">
        您已选择<span>{{ selectCount }}</span
        >条数据
        <a-button size="small" type="link">
          <a-icon type="vertical-align-bottom" />下载
        </a-button>
        <span class="total-text">共查询到{{ total }}条数据</span>
      </div>
      <div class="list">
        <a-table
          :data-source="tableList"
          :loading="tableLoading"
          :rowKey="row => row.id"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <a-table-column
            title="药品名称"
            data-index="drug_name"
            :width="130"
            sorter
            :ellipsis="true"
            ><template slot-scope="drug_name">
              <router-link to="/drug/detail" target="_blank">{{
                drug_name | placeholder
              }}</router-link>
            </template></a-table-column
          >
          <a-table-column
            title="商品名"
            data-index="drug_brand"
            :width="100"
            sorter
            :ellipsis="true"
            ><template slot-scope="drug_brand">{{
              drug_brand | placeholder
            }}</template></a-table-column
          >
          <a-table-column
            title="批准文号"
            data-index="approval_number"
            :width="180"
            sorter
            :ellipsis="true"
            ><template slot-scope="approval_number">{{
              approval_number | placeholder
            }}</template></a-table-column
          >
          <a-table-column
            title="性质分类"
            data-index="nature_class"
            :width="100"
            ><div slot-scope="nature_class">
              <a-tag :color="nature_tag_color(nature_class)">
                {{ nature_class | placeholder }}
              </a-tag>
            </div></a-table-column
          >
          <a-table-column
            title="主要成分"
            data-index="constituents"
            :ellipsis="true"
            ><template slot-scope="constituents">{{
              constituents | placeholder
            }}</template></a-table-column
          >
          <a-table-column :width="110" key="action">
            <template slot-scope="{ id }">
              <router-link :to="`/drug/detail?id=${id}`" target="_blank">
                <a-tooltip placement="top" title="详情"
                  ><a-button type="link"><a-icon type="file-text"/></a-button
                ></a-tooltip>
              </router-link>
              <a-tooltip placement="top" title="下载"
                ><a-button type="link"
                  ><a-icon
                    type="vertical-align-bottom"/></a-button></a-tooltip></template
          ></a-table-column>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import resultFilter from './result-filter';
import { DRUG_NATURE_CLASS } from '@/utils/constant/drug.js';

export default {
  props: {
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
    return {
      selectedRowKeys: [], // Check here to configure the default column
      selectCount: 0
      // nature_class: DRUG_NATURE_CLASS
    };
  },
  components: {
    resultFilter
  },
  computed: {
    pagination() {
      return {
        total: this.total,
        showTotal: (total, range) =>
          `第${range[0]}-${range[1]}条 / 共${total}条 `,
        pageSize: this.size
      };
    },
    nature_tag_color() {
      return function(params) {
        let color = '';
        DRUG_NATURE_CLASS.filter(item => {
          if (item.value === params) {
            color = item.color;
          }
        });
        return color;
      };
    }
  },
  mounted() {},
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination, filters, sorter);
      const { current, pageSize } = pagination;
      const searchForm = {};
      searchForm.page = current;
      searchForm.size = pageSize;
      if (sorter.order) {
        switch (sorter.columnKey) {
          case 'drug_name':
            searchForm.order = sorter.order === 'descend' ? 'desc' : 'asc';
            searchForm.orderType = 'drug_name';
            break;
          case 'drug_brand':
            searchForm.order = sorter.order === 'descend' ? 'desc' : 'asc';
            searchForm.orderType = 'drug_brand';
            break;
          case 'approval_number':
            searchForm.order = sorter.order === 'descend' ? 'desc' : 'asc';
            searchForm.orderType = 'approval_number';
            break;
          default:
            break;
        }
      } else {
        searchForm.orderType = '';
      }

      this.$emit('tableChange', searchForm);
    }
  }
};
</script>

<style lang="less" scoped>
.drug-result {
  width: 1200px;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  .filter {
    width: 250px;
    margin-right: 20px;
  }
  .main {
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
      button {
        .anticon {
          margin-right: -8px;
        }
      }
      .total-text {
        float: right;
      }
    }
    .list {
      flex: 1;
      .ant-btn {
        padding: 0 10px;
      }
      a {
        color: @text-link;
      }
    }
  }
}
</style>
