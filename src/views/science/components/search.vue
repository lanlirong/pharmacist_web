<template>
  <div class="search">
    <h1>科普宣教</h1>

    <div class="basic-container">
      <a-input
        size="large"
        allowClear
        placeholder="请输入文章标题"
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
        searchKey: 'test'
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
