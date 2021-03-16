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
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :columns="columns"
          :data-source="data"
        >
          <a slot="name" slot-scope="name">111{{ name }}</a>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import resultFilter from './result-filter';
const columns = [
  {
    title: '药品名称',
    dataIndex: 'name'
  },
  {
    title: '商品名',
    dataIndex: 'drug_brand'
  },
  {
    title: '批准文号',
    dataIndex: 'approval_number'
  },
  {
    title: '性质分类',
    dataIndex: 'nature_class'
  },
  {
    title: '用途',
    dataIndex: 'use_class'
  }
  //   {
  //     title: '',
  //     dataIndex: 'operate'
  //   }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: 'xxx',
    drug_brand: `Edward King ${i}`,
    approval_number: `cddds244322 ${i}`,
    nature_class: 'xxxx',
    use_class: `London, Park Lane no. ${i}`
  });
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      selectCount: 0,
      total: 46
    };
  },
  components: {
    resultFilter
  },
  computed: {},
  methods: {
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
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
    }
  }
}
</style>
