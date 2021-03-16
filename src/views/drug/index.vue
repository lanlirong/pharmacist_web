<template>
  <div class="drug">
    <!-- 搜索区域 start-->
    <search />
    <!-- 搜索区域 end-->
    <!-- 结果区域 start-->
    <result />
    <!-- 结果区域 end-->
    <!-- 数据说明区域 start-->
    <introduction />
    <!-- 数据说明区域 end-->
  </div>
</template>

>
<script>
import { DRUG_TYPE_ARR } from '@/utils/constant';
import search from './components/search';
import result from './components/result';
import introduction from './components/introduction';
export default {
  components: {
    search,
    result,
    introduction
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
