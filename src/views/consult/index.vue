<template>
  <div class="consult">
    <search @search="search" />
    <result
      :tableLoading="tableLoading"
      :total="total"
      :page="searchForm.page"
      :size="20"
      :tableList="tableList"
      @tableChange="tableChange"
    />
    <introduction />
  </div>
</template>

<script>
import search from './components/search';
import result from './components/result';
import introduction from './components/introduction';
import { _getList } from '@/services/api/disease';

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
      searchForm: {
        searchKey: '',
        page: 1,
        size: 20
        // order: 'asc'
      },
      tableList: []
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
      } catch (error) {
        this.tableLoading = false;
      }
    },
    search(searchForm) {
      const { searchKey } = searchForm;
      if (searchKey == '') {
        this.$message.warning('输入不能为空');
        return;
      }
      this.searchForm.searchKey = searchKey;
      this.getList();
    },
    tableChange(searchForm) {
      const { page, size, order } = searchForm;
      this.searchForm.page = page || 1;
      this.searchForm.size = size || 20;
      this.searchForm.order = order || 'asc';
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.consult {
  min-width: 1200px;
  margin: 0 auto;
  .consult-result {
    width: 1200px;
    margin: 20px auto;
  }
}
</style>
