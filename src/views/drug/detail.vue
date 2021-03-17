<template>
  <div class="detail-container">
    <!-- <a-page-header title="返回" @back="() => $router.push('/drug/search')" /> -->
    <h2>{{ drug.drug_name | placeholder }}</h2>
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
          {{ drug.drug_type | placeholder }}
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

        <!-- <a-descriptions-item label="图片">
          {{ drug.picture | placeholder }}
        </a-descriptions-item> -->
      </a-descriptions>
      <div class="picture">
        <img :src="drug.picture" />
      </div>
    </div>
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
</template>

<script>
import { _getDetail } from '@/services/api/drug';
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
        use_class: ''
      }
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const { data } = await _getDetail({ id: this.$route.query.id });
      this.drug = data;
      console.log(data);
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
  h2 {
    font-size: 20px;
    color: @theme-color;
    font-weight: 700;
    padding: 0 0 20px;
    text-align: center;
  }
  .ant-descriptions {
    background-color: #fff;
    margin-bottom: 20px;
    .ant-descriptions-item-content {
      max-width: 400px !important;
    }
  }
  .top {
    display: flex;
    .picture {
      width: 230px;
      border: 1px solid #e8e8e8;
      margin: 0 0 20px 20px;
      padding: 10px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .ant-descriptions {
      flex: 1;
    }
  }
}
</style>
