<template>
  <div class="drug">
    <!-- 搜索区域 start-->
    <search @search="search" />
    <!-- 搜索区域 end-->
    <!-- 结果区域 start-->
    <result
      :tableLoading="tableLoading"
      :total="total"
      :page="page"
      :size="20"
      :tableList="tableList"
      :filterObj="filterObj"
      @tableChange="tableChange"
      @filterChange="filterChange"
    />
    <!-- 结果区域 end-->
    <!-- 数据说明区域 start-->
    <introduction />
    <!-- 数据说明区域 end-->
  </div>
</template>

>
<script>
import search from './components/search';
import result from './components/result';
import introduction from './components/introduction';
import { _getList, _getFilterList } from '@/services/api/drug';

export default {
  components: {
    search,
    result,
    introduction
  },
  data() {
    return {
      tableLoading: false,
      total: 0,
      page: 1,
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
      filterObj: {}
      // reloadFilter: false
    };
  },
  methods: {
    async getList() {
      this.tableLoading = true;
      const { data } = await _getList({ ...this.searchForm });
      this.tableLoading = false;
      this.total = data.total;
      this.page = data.current_page;
      this.tableList = data.data;
      this.getFilterList();
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
}
</style>
