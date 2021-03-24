<template>
  <div class="consult">
    <search @search="search" @changeTabs="changeTabs" />
    <result
      :searchKey="searchForm.searchKey"
      :dataLoading="dataLoading"
      :total="total"
      :page="searchForm.page"
      :size="20"
      :dataList="dataList"
      @pageChange="pageChange"
    />
    <introduction />
  </div>
</template>

<script>
import search from './components/search';
import result from './components/result';
import introduction from './components/introduction';
import { _getList } from '@/services/api/consult';

export default {
  components: {
    search,
    result,
    introduction
  },
  data() {
    return {
      dataLoading: false,
      total: 0,
      searchForm: {
        searchKey: '',
        page: 1,
        size: 20,
        type: 0,
        way: 0
      },
      dataList: []
    };
  },
  methods: {
    async getList() {
      const { searchKey } = this.searchForm;
      if (searchKey == '') {
        this.$message.warning('输入不能为空');
        return;
      }
      this.dataLoading = true;
      try {
        const { data } = await _getList({ ...this.searchForm });
        this.dataLoading = false;
        this.total = data.total;
        this.searchForm.page = data.current_page;
        this.dataList = data.data;
      } catch (error) {
        this.dataLoading = false;
      }
    },
    search(searchForm) {
      const { searchKey, type, way } = searchForm;
      if (searchKey == '') {
        this.$message.warning('输入不能为空');
        return;
      }
      this.searchForm.searchKey = searchKey;
      this.searchForm.type = type;
      this.searchForm.way = way;
      this.getList();
    },
    pageChange(searchForm) {
      const { page, size } = searchForm;
      this.searchForm.page = page || 1;
      this.searchForm.size = size || 20;
      this.getList();
    },
    changeTabs() {
      this.dataList = [];
      this.total = 0;
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
