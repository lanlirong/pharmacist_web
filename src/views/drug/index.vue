<template>
  <div class="drug">
    <!-- 搜索区域 start-->
    <search @search="search" />
    <!-- 搜索区域 end-->
    <div class="main-container">
      <!-- 结果过滤 start -->
      <result-filter
        :filterObj="filterObj"
        :defaultFilter="defaultFilter"
        @filterChange="filterChange"
      />
      <!-- 结果过滤 end -->
      <!-- 结果区域 start-->
      <result
        :tableLoading="tableLoading"
        :total="total"
        :page="searchForm.page"
        :size="20"
        :tableList="tableList"
        @tableChange="tableChange"
      />
      <!-- 结果区域 end-->
    </div>
    <!-- 数据说明区域 start-->
    <introduction />
    <!-- 数据说明区域 end-->
  </div>
</template>

>
<script>
import search from './components/search';
import result from './components/result';
import resultFilter from './components/result-filter';
import introduction from './components/introduction';
import { _getList, _getFilterList } from '@/services/api/drug';

export default {
  components: {
    search,
    result,
    resultFilter,
    introduction
  },
  data() {
    return {
      tableLoading: false,
      total: 0,
      // page: 1,
      tableList: [],
      searchForm: {
        searchKey: '',
        type: 0,
        page: 1,
        size: 20,
        order: 'asc',
        orderType: '',
        drug_type: [],
        nature_class: [],
        use_class: [],
        manufacturer: []
      },
      filterObj: {},
      defaultFilter: {
        drug_type: [],
        nature_class: [],
        use_class: [],
        manufacturer: []
      }
    };
  },
  methods: {
    async getList() {
      const { searchKey } = this.searchForm;

      if (searchKey == '') {
        this.$message.warning('输入不能为空');
        return;
      }
      this.tableLoading = true;
      try {
        const { data } = await _getList({ ...this.searchForm });
        this.tableLoading = false;
        this.total = data.total;
        this.searchForm.page = data.current_page;
        this.tableList = data.data;
        this.getFilterList();
      } catch (error) {
        this.tableLoading = false;
      }
    },
    async getFilterList() {
      const { data } = await _getFilterList({ ...this.searchForm });
      this.filterObj = data;
    },
    search(searchForm) {
      const { searchKey, type } = searchForm;
      if (searchKey == '') {
        this.$message.warning('输入不能为空');
        return;
      }
      this.searchForm.drug_type = [];
      this.searchForm.nature_class = [];
      this.searchForm.use_class = [];
      this.searchForm.manufacturer = [];
      this.defaultFilter = {
        drug_type: [],
        nature_class: [],
        use_class: [],
        manufacturer: []
      };
      this.searchForm.page = 1;
      this.searchForm.searchKey = searchKey;
      this.searchForm.type = type;
      this.getList();
    },
    tableChange(searchForm) {
      const { page, size, order, orderType } = searchForm;
      this.searchForm.page = page || 1;
      this.searchForm.size = size || 20;
      this.searchForm.order = order || 'asc';
      this.searchForm.orderType = orderType || '';
      this.getList();
    },
    // 在结果中筛选
    filterChange(searchForm) {
      const { drug_type, nature_class, use_class, manufacturer } = searchForm;
      this.searchForm.drug_type = drug_type || [];
      this.searchForm.nature_class = nature_class || [];
      this.searchForm.use_class = use_class || [];
      this.searchForm.manufacturer = manufacturer || [];
      this.searchForm.page = 1;
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.drug {
  min-width: 1200px;
  margin: 0 auto;
  //   padding: 0 20px 40px;
  .main-container {
    width: 1200px;
    display: flex;
    margin: 0 auto;
    margin-top: 20px;
    .result-filter {
      width: 250px;
      margin-right: 20px;
    }
    .drug-result {
      flex: 1;
    }
  }
}
</style>
