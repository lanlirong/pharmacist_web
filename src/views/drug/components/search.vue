<template>
  <div class="search-container">
    <!-- 基本搜索框 -->
    <div class="basic-container">
      <div class="input-container">
        <a-input
          size="large"
          placeholder="请输入药品或疾病名称"
          v-model="searchKey"
        >
        </a-input>
        <a-button size="large" type="primary">搜索</a-button>
      </div>
      <a-radio-group v-model="type" @change="onRadioChange">
        <a-radio v-for="item in radioArr" :key="item.value" :value="item.value">
          {{ item.label }}
        </a-radio>
      </a-radio-group>
    </div>
    <!-- 高级搜索按钮 -->
    <div class="senior-text" @click="changeSenior">
      高级搜索...<svg-icon iconClass="search" />
    </div>
    <!-- 高级搜索 -->
    <div v-if="false" class="senior-input-container">11</div>
  </div>
</template>

<script>
import { DRUG_TYPE_ARR } from '@/utils/constant';
export default {
  data() {
    return {
      searchKey: '',
      type: 1,
      radioArr: DRUG_TYPE_ARR,
      showSenior: false
    };
  },
  methods: {
    onRadioChange(e) {
      console.log(e.target.value);
    },
    changeSenior() {
      this.showSenior = !this.showSenior;
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
