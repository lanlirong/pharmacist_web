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
          :columns="columns"
          :data-source="drugs"
          :loading="tableLoading"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <div slot="name" slot-scope="name">
            <router-link to="/drug/detail" target="_blank"
              ><a>{{ name }}</a></router-link
            >
          </div>
          <div slot="nature_class">
            <a-tag color="pink">
              pink
            </a-tag>
          </div>
          <div slot="operate">
            <router-link to="/drug/detail" target="_blank">
              <a-tooltip placement="top" title="详情"
                ><a-button type="link"><a-icon type="file-text"/></a-button
              ></a-tooltip>
            </router-link>
            <a-tooltip placement="top" title="下载"
              ><a-button type="link"
                ><a-icon type="vertical-align-bottom"/></a-button
            ></a-tooltip>
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import resultFilter from './result-filter';
import { DRUG_NATURE_CLASS } from '@/utils/constant/drug.js';
const columns = [
  {
    title: '药品名称',
    dataIndex: 'name',
    sorter: true,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '商品名',
    dataIndex: 'drug_brand',
    sorter: true
  },
  {
    title: '批准文号',
    dataIndex: 'approval_number',
    sorter: true
  },
  {
    title: '性质分类',
    dataIndex: 'nature_class',
    scopedSlots: { customRender: 'nature_class' }
  },
  {
    title: '主要成分',
    dataIndex: 'constituents'
  },
  {
    title: '',
    // dataIndex: 'name',
    scopedSlots: { customRender: 'operate' }
  }
];

export default {
  data() {
    return {
      drugs: [
        {
          key: 1,
          name: 'xxx',
          drug_brand: 'Edward King 1',
          approval_number: 'cddds244322 1',
          nature_class: 'xxxx',
          constituents: 'London, Park Lane no. 1'
        }
      ],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      selectCount: 0,
      total: 46,
      nature_class: DRUG_NATURE_CLASS,
      tableLoading: false,
      pagination: {
        total: 100,
        showTotal: (total, range) =>
          `第${range[0]}-${range[1]}条 / 共${total}条 `,
        pageSize: 20
      }
    };
  },
  components: {
    resultFilter
  },
  computed: {},
  mounted() {},
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination, filters, sorter);
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
