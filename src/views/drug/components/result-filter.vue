<template>
  <div class="result-filter">
    <div class="header">
      在结果中筛选：
    </div>
    <a-collapse>
      <a-collapse-panel key="1" header="剂型">
        <div>
          <a-checkbox-group @change="onChange">
            <a-row>
              <a-col :span="8">
                <a-checkbox value="A">
                  A
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="B">
                  B
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="C">
                  C
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="D">
                  D
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="E">
                  E
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="包装单位">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="用途">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="4" header="生产厂家">
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text:
        'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
    };
  },
  methods: {
    onChange(checkedValues) {
      console.log('checked = ', checkedValues);
    }
  }
};
</script>

<style lang="less" scoped>
.result-filter {
  background-color: #fff;
  box-shadow: @box-shadow;
  padding: 20px;
  .header {
    font-weight: 700;
    margin-bottom: 15px;
  }
}
</style>
