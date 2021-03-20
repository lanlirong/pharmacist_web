<template>
  <div class="detail-container disease">
    <loading v-if="loading" tip="数据加载中..." size="large" />
    <h2>
      <span>{{ disease.name | placeholder }}</span
      ><a-icon class="download" type="download" @click="download" />
    </h2>

    <!-- 上部表格 -->
    <div class="top">
      <a-descriptions bordered :column="3">
        <a-descriptions-item label="发病人群">
          {{ disease.crowd | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="传染性">
          {{ disease.contagion | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="并发症">
          {{ disease.complication | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="治疗方式">
          {{ disease.treatWay | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="治疗周期">
          {{ disease.cycle | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="治愈率">
          {{ disease.rate | placeholder }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <!-- 中间表格 -->
    <div class="middle">
      <a-descriptions bordered :span="3">
        <a-descriptions-item label="常用药物">
          <div v-if="disease.drug.length > 0">
            <a v-for="(item, index) in disease.drug" :key="index">{{ item }}</a>
          </div>
          <span v-else>---</span>
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <!-- 下部表格 -->
    <div class="bottom">
      <a-descriptions bordered>
        <a-descriptions-item label="疾病简介">
          {{ disease.introduction | placeholder }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script>
import { _getOne } from '@/services/api/disease';
import { DISEASE_DOWNLOAD_HEADER } from '@/utils/constant/disease.js';
import { downloadToExcel, getObjValueArr } from '@/utils/tool.js';
export default {
  data() {
    return {
      disease: {
        id: '',
        name: '',
        introduction: '',
        crowd: '',
        contagion: '',
        complication: '',
        treatWay: '',
        cycle: '',
        rate: '',
        drug: []
      },
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
        const { data } = await _getOne({ id: this.$route.query.id });
        data.drug = data.drug.split(',');
        this.disease = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    download() {
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
      } = this.disease;
      drug = drug.join(',');
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
