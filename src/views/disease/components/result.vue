<template>
  <div class="disease-result">
    <div class="download">
      您已选择<span>{{ selectedRowKeys.length }}</span
      >条数据
      <a-button size="small" type="link" @click="downloadAll">
        <a-icon type="download" />下载
      </a-button>
      <span class="total-text">共查询到{{ total }}条数据</span>
    </div>
    <div class="list">
      <a-table
        :data-source="tableList"
        :loading="tableLoading"
        :rowKey="row => row.id"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <a-table-column
          title="疾病名称"
          key="name"
          :width="130"
          :sorter="true"
          :ellipsis="true"
          ><template slot-scope="{ name, id }">
            <router-link :to="`/disease/detail?id=${id}`" target="_blank">{{
              name | placeholder
            }}</router-link>
          </template></a-table-column
        >
        <a-table-column
          title="发病人群"
          data-index="crowd"
          key="crowd"
          :width="100"
          :ellipsis="true"
          ><template slot-scope="crowd">{{
            crowd | placeholder
          }}</template></a-table-column
        >
        <a-table-column
          title="治疗方式"
          data-index="treatWay"
          key="treatWay"
          :width="200"
          :ellipsis="true"
          ><template slot-scope="treatWay">{{
            treatWay | placeholder
          }}</template></a-table-column
        >
        <a-table-column
          title="治疗周期"
          data-index="cycle"
          key="cycle"
          :width="80"
          :ellipsis="true"
          ><template slot-scope="cycle">{{
            cycle | placeholder
          }}</template></a-table-column
        >
        <a-table-column
          title="治愈率"
          data-index="rate"
          key="rate"
          :width="80"
          :ellipsis="true"
          ><div slot-scope="rate">
            <a-tag v-if="rate" :color="rate_tag_color(rate)">
              {{ rate | ellipsisRate }} </a-tag
            ><span v-else>---</span>
          </div></a-table-column
        >
        <a-table-column :width="110" key="action">
          <template slot-scope="row">
            <router-link :to="`/disease/detail?id=${row.id}`" target="_blank">
              <a-tooltip placement="top" title="详情"
                ><a-button type="link"><a-icon type="file-text"/></a-button
              ></a-tooltip>
            </router-link>
            <a-tooltip placement="top" title="下载"
              ><a-button type="link" @click="download(row)"
                ><a-icon type="download"/></a-button></a-tooltip></template
        ></a-table-column>
      </a-table>
    </div>
  </div>
</template>
<script>
import {
  DISEASE_DOWNLOAD_HEADER,
  RATE_COLOR
} from '@/utils/constant/disease.js';
import { downloadToExcel, getObjValueArr } from '@/utils/tool.js';

export default {
  props: {
    tableLoading: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: Number,
      default: 20
    },
    tableList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedRowKeys: [] // Check here to configure the default column
    };
  },
  computed: {
    pagination() {
      return {
        total: this.total,
        showTotal: (total, range) =>
          `第${range[0]}-${range[1]}条 / 共${total}条 `,
        pageSize: this.size,
        current: this.page
      };
    },
    rate_tag_color() {
      return function(params) {
        // eslint-disable-next-line use-isnan
        if (
          params.indexOf('%') == -1 ||
          isNaN(parseFloat(params.split('%')[0]))
        )
          return '';
        if (params > '80%') return RATE_COLOR[0];
        if (params > '50%') return RATE_COLOR[1];
        return RATE_COLOR[2];
      };
    }
  },
  filters: {
    ellipsisRate: function(params) {
      if (params.length > 6) return params.substr(0, 6) + '...';
      return params;
    }
  },
  mounted() {},
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    handleTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      const searchForm = {};
      searchForm.page = current;
      searchForm.size = pageSize;
      searchForm.order = sorter.order === 'descend' ? 'desc' : 'asc';

      this.$emit('tableChange', searchForm);
    },
    // 下载一条
    download(row) {
      let {
        name,
        introduction,
        crowd,
        contagion,
        complication,
        treatWay,
        cycle,
        rate,
        drug
      } = row;
      let data = getObjValueArr({
        name,
        introduction,
        crowd,
        contagion,
        complication,
        treatWay,
        cycle,
        rate,
        drug
      });
      downloadToExcel([data], DISEASE_DOWNLOAD_HEADER, 'disease_' + name);
    },
    // 批量下载
    downloadAll() {
      let selectDiseases = [];
      this.selectedRowKeys.forEach(item => {
        this.tableList.some(disease => {
          if (item == disease.id) {
            selectDiseases.push(disease);
          }
        });
      });
      let datas = [];
      selectDiseases.forEach(item => {
        let {
          name,
          introduction,
          crowd,
          contagion,
          complication,
          treatWay,
          cycle,
          rate,
          drug
        } = item;
        let data = getObjValueArr({
          name,
          introduction,
          crowd,
          contagion,
          complication,
          treatWay,
          cycle,
          rate,
          drug
        });
        datas.push(data);
      });
      downloadToExcel(datas, DISEASE_DOWNLOAD_HEADER, 'disease_批量');
    }
  }
};
</script>

<style lang="less" scoped>
.disease-result {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: @border;
  background-color: #fff;
  padding: 20px;
  box-shadow: @box-shadow;

  .download {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background-color: #f7f8fc;
    border: @border;
    span {
      color: @theme-color;
      padding: 0 5px;
    }
    button {
      .anticon {
        margin-right: -8px;
      }
    }
    .total-text {
      float: right;
    }
  }
  .list {
    flex: 1;
    .ant-btn {
      padding: 0 10px;
    }
    a {
      color: @text-link;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
