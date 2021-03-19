<template>
  <div class="interaction">
    <search @search="search" />
    <result :tableLoading="tableLoading" :tableList="tableList" />
    <introduction />
  </div>
</template>

<script>
import search from './components/search';
import result from './components/result';
import introduction from './components/introduction';
import { _getList } from '@/services/api/interaction';

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
        searchKey: ''
      },
      tableList: []
    };
  },
  methods: {
    async getList() {
      this.tableLoading = true;
      try {
        const { data } = await _getList({ ...this.searchForm });
        this.tableLoading = false;
        this.tableList = data;
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
    }
  }
};
</script>

<style lang="less" scoped>
.interaction {
  min-width: 1200px;
  margin: 0 auto;
  .drug-result {
    width: 1200px;
    margin: 20px auto;
  }
}
</style>
