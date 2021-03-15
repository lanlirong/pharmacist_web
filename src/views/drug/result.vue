<template>
  <div class="drug-result">
    <div class="filter">
      <a-list>
        <div slot="header">
          在结果中筛选
        </div>
        <a-list-item>1 </a-list-item>
        <a-list-item>1 </a-list-item>
        <a-list-item>1 </a-list-item>
        <a-list-item>1 </a-list-item>
        <a-list-item>1 </a-list-item>
        <a-list-item>1 </a-list-item>

        <!-- <div slot="footer">
          Footer
        </div> -->
      </a-list>
    </div>
    <div class="main">
      <div class="download">download</div>
      <div class="list">
        <a-table
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :columns="columns"
          :data-source="data"
        />
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  methods: {
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    }
  }
};
</script>

<style lang="less" scoped>
.drug-result {
  width: 1200px;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  .filter {
    width: 250px;
    border: @border;
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    border: @border;

    .download {
      height: 40px;
      border: @border;
    }
    .list {
      flex: 1;
    }
  }
}
</style>
