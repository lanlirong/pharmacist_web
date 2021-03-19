<template>
  <div class="search-container">
    <!-- 基本搜索框 -->
    <div class="basic-container">
      <div class="input-container">
        <a-input
          size="large"
          allowClear
          :placeholder="palceText"
          v-model.trim="searchForm.searchKey"
          @pressEnter="search"
        >
        </a-input>
        <a-button size="large" type="primary" @click="search">搜索</a-button>
      </div>
      <a-radio-group v-model="searchForm.type" @change="onRadioChange">
        <a-radio v-for="item in radioArr" :key="item.value" :value="item.value">
          {{ item.label }}
        </a-radio>
      </a-radio-group>
    </div>
    <!-- 高级搜索按钮 -->
    <!-- <div class="senior-text" @click="changeSenior">
      高级搜索...<svg-icon iconClass="search" />
    </div> -->
    <!-- 高级搜索 -->
    <!-- <div v-if="false" class="senior-input-container">11</div> -->
  </div>
</template>

<script>
import { DRUG_TYPE_ARR } from '@/utils/constant/drug';
export default {
  data() {
    return {
      searchForm: {
        searchKey: '三七',
        type: 0
      },
      radioArr: DRUG_TYPE_ARR,
      palceText: '请输入药品名，例如三七'
    };
  },
  mounted() {},
  methods: {
    // 修改placeHolder
    onRadioChange(e) {
      const palceTexts = [
        '请输入药品名，例如三七',
        '请输入药物商品名，例如安立派',
        '请输入十三位条形码，例如6934497200398',
        '请输入药品包含的主要成分，例如人参',
        '请输入疾病名称，例如高血压'
      ];
      this.palceText = palceTexts[e.target.value];
    },
    // 搜索
    search() {
      this.$emit('search', this.searchForm);
    }
  }
};
</script>

<style lang="less" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px 0;
  position: sticky;
  .basic-container {
    width: 60%;
    max-width: 1200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .input-container {
      display: flex;
      width: 100%;

      .ant-input {
        border: 1px solid @theme-color;
        border-radius: 4px;
      }
    }
    .ant-radio-group {
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
  }
  .senior-text {
    width: 60%;
    max-width: 1200px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    color: @text-link;
    cursor: pointer;
    .svg-icon {
      height: 20px;
      width: 20px;
      margin-top: -3px;
      vertical-align: middle;
    }
    &:hover {
      text-decoration: underline;
    }
  }

  .senior-input-container {
    height: 150px;
    width: 60%;
    max-width: 1200px;
    border: 1px solid @theme-color;
  }
}
</style>
