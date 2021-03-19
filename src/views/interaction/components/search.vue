<template>
  <div class="search">
    <h1>药物相互作用</h1>

    <div class="basic-container">
      <a-input
        size="large"
        allowClear
        placeholder="请输入药品名称"
        v-model.trim="searchForm.searchKey"
        @pressEnter="search"
      >
      </a-input>
      <a-button size="large" type="primary" @click="search">搜索</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        searchKey: '阿'
      }
    };
  },
  methods: {
    search() {
      this.$emit('search', this.searchForm);
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 20px;
    margin: 10px 0;
    font-weight: 700;
  }
  .basic-container {
    width: 60%;
    max-width: 1200px;
    margin-bottom: 20px;
    margin-top: 10px;
    display: flex;
  }
}
</style>
