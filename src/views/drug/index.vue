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
      @tableChange="tableChange"
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
import { _getList } from '@/services/api/drug';

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
        orderType: ''
      }
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
    },
    search(searchForm) {
      const { searchKey, type } = searchForm;
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
