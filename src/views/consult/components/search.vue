<template>
  <div class="search">
    <h1>用药咨询</h1>
    <div class="basic-container">
      <a-tabs type="card" default-active-key="0" @change="changeTabs">
        <a-tab-pane key="0" tab="关键词">
          <div class="input-container">
            <a-input
              size="large"
              allowClear
              placeholder="请输入问题关键字"
              v-model.trim="searchForm.searchKey"
              @pressEnter="search"
            >
            </a-input>
            <a-button size="large" type="primary" @click="search"
              >搜索</a-button
            >
          </div>
          <a-radio-group v-model="searchForm.type">
            <a-radio
              v-for="item in radioArr"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-radio>
          </a-radio-group>
        </a-tab-pane>
        <a-tab-pane key="1" tab="书名" force-render>
          <a-select placeholder="下拉选择" size="large" @change="handleChange">
            <a-select-option
              v-for="(item, index) in books"
              :value="item.B_ISBN"
              :key="index"
            >
              {{ item.B_name }}
            </a-select-option>
          </a-select>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { CONSULT_TYPE_ARR } from '@/utils/constant/consult';
import { _getBooks } from '@/services/api/consult';
export default {
  data() {
    return {
      searchForm: {
        searchKey: '百日咳',
        type: 0,
        way: 0
      },
      radioArr: CONSULT_TYPE_ARR,
      books: []
    };
  },
  mounted() {},
  methods: {
    async getBooks() {
      try {
        const { data } = await _getBooks();
        this.books = data || [];
      } catch (error) {
        console.log(error);
      }
    },
    changeTabs(activeKey) {
      if (activeKey == 1) this.getBooks();
      this.searchForm.way = activeKey;
    },
    search() {
      this.$emit('search', this.searchForm);
    },
    handleChange(value) {
      this.searchForm.searchKey = value;
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
    display: flex;
    .ant-tabs {
      width: 100%;
      .input-container {
        display: flex;
        margin-bottom: 10px;
      }
      .ant-select {
        width: 100%;
        border: 1px solid @theme-color;
        border-radius: 4px;
      }
      .ant-select-lg {
        font-size: 14px;
      }
    }
  }
}
</style>
