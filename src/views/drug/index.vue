<template>
  <div class="drug">
    <!-- 搜索区域 -->
    <search />
    <!-- 搜索区域 -->
    <!-- 结果区域 -->
    <result />
    <!-- 结果区域 -->
  </div>
</template>

>
<script>
import { DRUG_TYPE_ARR } from '@/utils/constant';
import search from './search';
import result from './result';
export default {
  components: {
    search,
    result
  },
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
