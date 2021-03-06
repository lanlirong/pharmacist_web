<template>
  <div class="detail-container">
    <loading v-if="loading" tip="数据加载中..." size="large" />
    <h2>
      <span>{{ drug.drug_name | placeholder }}</span
      ><a-icon class="download" type="download" @click="download" />
    </h2>

    <!-- 上部表格 -->
    <div class="top">
      <a-descriptions bordered :column="3">
        <a-descriptions-item label="商品条码">
          {{ drug.bar_code | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="拼音简码">
          {{ drug.simple_code | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="本位码">
          {{ drug.bit_code | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="规格">
          {{ drug.specifications | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="剂型">
          {{ drug.dosage_form | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="包装单位">
          {{ drug.packing_unit | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="批准文号">
          {{ drug.approval_number | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="药品类型">
          <!-- {{ drug.drug_type | placeholder }} -->
          <a-tag :color="drugTypeColors[drug.drug_type]">{{
            drugTypes[drug.drug_type]
          }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="性质分类">
          {{ drug.nature_class | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="用途分类">
          {{ drug.use_class | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="商品名">
          {{ drug.drug_brand | placeholder }}
        </a-descriptions-item>
      </a-descriptions>
      <div class="picture">
        <img :src="drug.picture" :onerror="defaultImg" />
      </div>
    </div>
    <!-- 中间表格 -->
    <div class="middle">
      <a-descriptions bordered :span="3">
        <a-descriptions-item label="主治疾病">
          <div v-if="drug.mainDiseases.length > 0">
            <a v-for="(item, index) in drug.mainDiseases" :key="index">{{
              item
            }}</a>
          </div>
          <span v-else>---</span>
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <!-- 下部表格 -->
    <div class="bottom">
      <a-descriptions bordered>
        <a-descriptions-item label="主要成分">
          {{ drug.constituents | placeholder }} </a-descriptions-item
        ><a-descriptions-item label="性状">
          {{ drug.property | placeholder }} </a-descriptions-item
        ><a-descriptions-item label="适应症">
          {{ drug.indication | placeholder }} </a-descriptions-item
        ><a-descriptions-item label="用法用量">
          {{ drug.dosage | placeholder }} </a-descriptions-item
        ><a-descriptions-item label="不良反应">
          {{ drug.adverse_reactions | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="禁忌">
          {{ drug.contraindication | placeholder }}</a-descriptions-item
        >
        <a-descriptions-item label="注意事项">
          {{ drug.attentions | placeholder }}</a-descriptions-item
        >
        <a-descriptions-item label="药物相互作用">
          {{ drug.interreaction | placeholder }}</a-descriptions-item
        >
        <a-descriptions-item label="贮藏">
          {{ drug.depot | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="生产厂家">
          {{ drug.manufacturer | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="生产场地">
          {{ drug.address | placeholder }}</a-descriptions-item
        >
      </a-descriptions>
    </div>
  </div>
</template>

<script>
import { _getDetail } from '@/services/api/drug';
import { DRUG_DOWNLOAD_HEADER } from '@/utils/constant/drug.js';
import { downloadToExcel, getObjValueArr } from '@/utils/tool.js';
export default {
  data() {
    return {
      drug: {
        address: '',
        adverse_reactions: '',
        approval_number: '',
        attentions: '',
        bar_code: '',
        bit_code: '',
        constituents: '',
        contraindication: '',
        depot: '',
        dosage: '',
        dosage_form: '',
        drug_brand: '',
        drug_name: '',
        drug_type: '0',
        id: 0,
        indication: '',
        interreaction: '',
        manufacturer: '',
        nature_class: '',
        packing_unit: '',
        picture: '',
        property: '',
        simple_code: '',
        specifications: '',
        use_class: '',
        mainDiseases: []
      },
      defaultImg: 'this.src="' + require('@/assets/images/default.png') + '"',
      drugTypes: ['非处方药', '处方药'],
      drugTypeColors: ['green', 'red'],
      loading: false
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.loading = true;
      try {
        const { data } = await _getDetail({ id: this.$route.query.id });
        this.drug = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    download() {
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
      } = this.drug;
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
    }
  }
};
</script>

<style lang="less" scoped>
.detail-container {
  width: 1200px;
  margin: 20px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h2 {
    width: 100%;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    color: @theme-color-1;
    text-align: center;
    position: relative;
    span {
      display: inline-block;
      line-height: 40px;
      border-bottom: 2px solid @theme-color-1;
      border-radius: 4px;
    }
    .download {
      position: absolute;
      margin-left: 10px;
      right: 0;
      top: 10px;
      cursor: pointer;
      &:hover {
        color: @theme-color;
      }
    }
  }
  .ant-descriptions {
    background-color: #fff;
    margin-bottom: 20px;
  }
  .top {
    width: 100%;
    display: flex;
    .picture {
      width: 218px;
      border: 1px solid #e8e8e8;
      margin: 0 0 20px 20px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        // height: 100%;
        object-fit: cover;
      }
    }
    .ant-descriptions {
      flex: 1;
    }
  }
  .middle {
    width: 100%;
    a {
      color: @text-link;
      padding: 0 10px;
      text-decoration: underline;
      transition: all 0.3s;
      &:hover {
        color: @theme-color;
        text-decoration: none;
      }
    }
  }
  .bottom {
    width: 100%;
  }
}
</style>
