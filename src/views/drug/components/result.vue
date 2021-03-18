<template>
  <div class="drug-result">
    <!-- 结果过滤 -->
    <div class="filter">
      <result-filter :filterObj="filterObj" @filterChange="filterChange" />
    </div>
    <!--结果列表 -->
    <div class="main">
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
            title="药品名称"
            key="drug_name"
            :width="130"
            :sorter="true"
            :ellipsis="true"
            ><template slot-scope="{ drug_name, id }">
              <router-link :to="`/drug/detail?id=${id}`" target="_blank">{{
                drug_name | placeholder
              }}</router-link>
            </template></a-table-column
          >
          <a-table-column
            title="商品名"
            data-index="drug_brand"
            key="drug_brand"
            :width="100"
            :sorter="true"
            :ellipsis="true"
            ><template slot-scope="drug_brand">{{
              drug_brand | placeholder
            }}</template></a-table-column
          >
          <a-table-column
            title="批准文号"
            data-index="approval_number"
            key="approval_number"
            :width="180"
            :sorter="true"
            :ellipsis="true"
            ><template slot-scope="approval_number">{{
              approval_number | placeholder
            }}</template></a-table-column
          >
          <a-table-column
            title="性质分类"
            data-index="nature_class"
            key="nature_class"
            :width="100"
            ><div slot-scope="nature_class">
              <a-tag :color="nature_tag_color(nature_class)">
                {{ nature_class | placeholder }}
              </a-tag>
            </div></a-table-column
          >
          <a-table-column
            title="主要成分"
            data-index="constituents"
            key="constituents"
            :ellipsis="true"
            ><template slot-scope="constituents">{{
              constituents | placeholder
            }}</template></a-table-column
          >
          <a-table-column :width="110" key="action">
            <template slot-scope="row">
              <router-link :to="`/drug/detail?id=${row.id}`" target="_blank">
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
  </div>
</template>
<script>
import resultFilter from './result-filter';
import {
  DRUG_NATURE_CLASS,
  DRUG_DOWNLOAD_HEADER
} from '@/utils/constant/drug.js';
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
    },
    filterObj: {
      type: Object,
      default: () => {
        return {
          nature_class: [],
          drug_type: [],
          use_class: [],
          manufacturer: []
        };
      }
    }
  },
  data() {
    return {
      selectedRowKeys: [] // Check here to configure the default column
    };
  },
  components: {
    resultFilter
  },
  computed: {
    pagination() {
      return {
        total: this.total,
        showTotal: (total, range) =>
          `第${range[0]}-${range[1]}条 / 共${total}条 `,
        pageSize: this.size
      };
    },
    nature_tag_color() {
      return function(params) {
        let color = '';
        DRUG_NATURE_CLASS.filter(item => {
          if (item.value === params) {
            color = item.color;
          }
        });
        return color;
      };
    }
  },
  mounted() {},
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination, filters, sorter);
      const { current, pageSize } = pagination;
      const searchForm = {};
      searchForm.page = current;
      searchForm.size = pageSize;
      if (sorter.order) {
        switch (sorter.columnKey) {
          case 'drug_name':
            searchForm.order = sorter.order === 'descend' ? 'desc' : 'asc';
            searchForm.orderType = 'drug_name';
            break;
          case 'drug_brand':
            searchForm.order = sorter.order === 'descend' ? 'desc' : 'asc';
            searchForm.orderType = 'drug_brand';
            break;
          case 'approval_number':
            searchForm.order = sorter.order === 'descend' ? 'desc' : 'asc';
            searchForm.orderType = 'approval_number';
            break;
          default:
            break;
        }
      } else {
        searchForm.orderType = '';
      }

      this.$emit('tableChange', searchForm);
    },
    // 下载一条
    download(row) {
      const {
        drug_name,
        bar_code,
        bit_code,
        simple_code,
        drug_brand,
        specifications,
        dosage_form,
        packing_unit,
        approval_number,
        drug_type,
        nature_class,
        use_class,
        constituents,
        property,
        indication,
        dosage,
        adverse_reactions,
        contraindication,
        attentions,
        interreaction,
        depot,
        manufacturer,
        address,
        mainDiseases
      } = row;
      let mainDiseaseStr = mainDiseases.join(',');
      let data = getObjValueArr({
        drug_name,
        bar_code,
        bit_code,
        simple_code,
        drug_brand,
        specifications,
        dosage_form,
        packing_unit,
        approval_number,
        drug_type,
        nature_class,
        use_class,
        constituents,
        property,
        indication,
        dosage,
        adverse_reactions,
        contraindication,
        attentions,
        interreaction,
        depot,
        manufacturer,
        address,
        mainDiseaseStr
      });
      downloadToExcel([data], DRUG_DOWNLOAD_HEADER, 'drug_' + drug_name);
    },
    // 批量下载
    downloadAll() {
      let selectDrugs = [];
      this.selectedRowKeys.forEach(item => {
        this.tableList.some(drug => {
          if (item == drug.id) {
            selectDrugs.push(drug);
          }
        });
      });
      let datas = [];
      selectDrugs.forEach(item => {
        const {
          drug_name,
          bar_code,
          bit_code,
          simple_code,
          drug_brand,
          specifications,
          dosage_form,
          packing_unit,
          approval_number,
          drug_type,
          nature_class,
          use_class,
          constituents,
          property,
          indication,
          dosage,
          adverse_reactions,
          contraindication,
          attentions,
          interreaction,
          depot,
          manufacturer,
          address,
          mainDiseases
        } = item;
        let mainDiseaseStr = mainDiseases.join(',');
        let data = getObjValueArr({
          drug_name,
          bar_code,
          bit_code,
          simple_code,
          drug_brand,
          specifications,
          dosage_form,
          packing_unit,
          approval_number,
          drug_type,
          nature_class,
          use_class,
          constituents,
          property,
          indication,
          dosage,
          adverse_reactions,
          contraindication,
          attentions,
          interreaction,
          depot,
          manufacturer,
          address,
          mainDiseaseStr
        });
        datas.push(data);
      });
      console.log(datas);
      downloadToExcel(datas, DRUG_DOWNLOAD_HEADER, 'drug_批量');
    },
    filterChange(val) {
      this.$emit('filterChange', val);
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
    margin-right: 20px;
  }
  .main {
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
}
</style>
