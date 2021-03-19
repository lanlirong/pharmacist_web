<template>
  <div class="result-filter">
    <div class="container">
      <div class="header">
        在结果中筛选：<a-button type="link" size="small" @click="removeFilter"
          >清除</a-button
        ><a-button type="primary" size="small" ghost @click="filterChange"
          >确认</a-button
        >
      </div>
      <a-collapse>
        <a-collapse-panel key="1" header="是否处方药">
          <a-checkbox-group
            :value="selectFilter.drug_type"
            @change="changeType"
          >
            <a-checkbox
              v-for="(item, index) in filterObj.drug_type"
              :key="index"
              :value="item.drug_type"
            >
              {{ drugTypes[item.drug_type] }}({{ item.count }})
            </a-checkbox>
          </a-checkbox-group>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="性质分类">
          <a-checkbox-group
            :value="selectFilter.nature_class"
            @change="changeNature"
          >
            <a-checkbox
              v-for="(item, index) in filterObj.nature_class"
              :key="index"
              :value="item.nature_class"
            >
              {{ item.nature_class }}({{ item.count }})
            </a-checkbox>
          </a-checkbox-group>
        </a-collapse-panel>

        <a-collapse-panel key="3" header="用途">
          <a-checkbox-group :value="selectFilter.use_class" @change="changeUse">
            <a-checkbox
              v-for="(item, index) in filterObj.use_class"
              :key="index"
              :value="item.use_class"
            >
              {{ item.use_class }}({{ item.count }})
            </a-checkbox>
          </a-checkbox-group>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="生产厂家">
          <a-select
            mode="multiple"
            style="width: 100%;"
            placeholder="Please select"
            :value="selectFilter.manufacturer"
            :dropdownMatchSelectWidth="false"
            @change="changeManu"
          >
            <a-select-option
              v-for="(item, index) in filterObj.manufacturer"
              :key="index"
              :value="item.manufacturer"
            >
              {{ item.manufacturer }}({{ item.count }})
            </a-select-option>
          </a-select>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterObj: {
      type: Object,
      default: () => {
        return {
          drug_type: [],
          nature_class: [],
          use_class: [],
          manufacturer: []
        };
      }
    },
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          drug_type: [],
          nature_class: [],
          use_class: [],
          manufacturer: []
        };
      }
    }
  },
  data() {
    return {
      drugTypes: ['非处方药', '处方药'],
      selectFilter: {
        drug_type: [],
        nature_class: [],
        use_class: [],
        manufacturer: []
      }
    };
  },
  watch: {
    defaultFilter: {
      handler: function(val) {
        console.log(val, 'watch');
        this.selectFilter = { ...val };
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeType(checkedValues) {
      this.selectFilter.drug_type = checkedValues;
    },
    changeNature(checkedValues) {
      this.selectFilter.nature_class = checkedValues;
    },
    changeUse(checkedValues) {
      this.selectFilter.use_class = checkedValues;
    },
    changeManu(checkedValues) {
      this.selectFilter.manufacturer = checkedValues;
    },
    filterChange() {
      this.$emit('filterChange', this.selectFilter);
    },
    removeFilter() {
      this.selectFilter = {
        nature_class: [],
        drug_type: [],
        use_class: [],
        manufacturer: []
      };
      this.$emit('filterChange', this.selectFilter);
    }
  }
};
</script>

<style lang="less" scoped>
.result-filter {
  .container {
    box-shadow: @box-shadow;
    padding: 20px;
    background-color: #fff;
  }
  .header {
    font-weight: 700;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
}
</style>
