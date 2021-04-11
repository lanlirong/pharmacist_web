<template>
  <div class="detail-card">
    <ul>
      <li>
        <a-descriptions
          :title="data.name + ' --> ' + data.interaction"
          :column="1"
        >
          <a-descriptions-item label="结果">
            {{ data.result | placeholder }}
          </a-descriptions-item>
          <a-descriptions-item label="临床建议">
            {{ data.suggest | placeholder }}
          </a-descriptions-item>
          <a-descriptions-item class="evidence" label="临床证据">
            {{ data.evidence | placeholder }}
          </a-descriptions-item>
          <a-descriptions-item label="证据级别">
            <a-tag v-if="data.level" color="red"> {{ data.level }}</a-tag>
            <span v-else>---</span>
          </a-descriptions-item>
        </a-descriptions>
      </li>
      <li>
        <h2>
          参考文献
        </h2>
        <a-list bordered :data-source="data.references">
          <a-list-item slot="renderItem" slot-scope="item">
            {{ item }}
          </a-list-item>
        </a-list>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.detail-card {
  > ul > li {
    margin-bottom: 20px;
    border-radius: 8px;
    background-color: #fff;
    padding: 10px;
    box-shadow: @box-shadow;
    border: @border;
    .ant-descriptions-item-colon {
      font-weight: 700;
    }
    h2 {
      font-size: 16px;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
