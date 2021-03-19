<template>
  <div class="introduction">
    <ul class="intro-container">
      <li>
        <h2>功能介绍</h2>
        <div class="des">
          <p>检索药品的基本信息、包装图片和主治疾病。</p>
          <p>提供多种检索方式，可在结果中按条件过滤，可对部分字段排序查看。</p>
          <p>可单条或者批量下载成excel格式数据。</p>
        </div>
      </li>
      <li>
        <h2>数据说明</h2>
        <div class="des">
          <p>药品数据库目前累记收录{{ count }}条数据。</p>
          <p>
            数据包括药品各种名称字段、各种编码字段、药品说明书相关字段以及主治疾病字段在内的23个字段,绝大部分药品收录图片，图片累计约45000余张
          </p>
        </div>
      </li>
      <li>
        <h2>其他说明</h2>
        <div class="des">
          <p>
            您在使用过程中发现数据有误，或者有补充数据，欢迎通过右侧补充纠错窗口向我们发送反馈信息。
          </p>
          <p>您有任何其他问题，亦可以通过右侧留言窗口向我们留言。</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { _getDrugCount } from '@/services/api/drug';
export default {
  data() {
    return {
      count: '---'
    };
  },
  mounted() {
    this.getDrugCount();
  },
  methods: {
    async getDrugCount() {
      const { data } = await _getDrugCount();
      this.count = data;
    }
  }
};
</script>

<style lang="less" scoped>
.introduction {
  padding-bottom: 40px;
  padding-top: 40px;
  display: flex;
  justify-content: center;
  margin-top: 80px;
  background-color: #fff;
  .intro-container {
    width: 1200px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    li {
      width: 400px;

      h2 {
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 10px;
        font-weight: 700;
        color: @theme-color;
        .anticon {
          margin-right: 10px;
        }
      }
      .des {
        border-left: 3px solid @theme-color-1;
        color: #8597b6;
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 10px;
        margin-right: 20px;
        padding: 10px;
        background-color: #f7f7f9;
        border-radius: 4px;

        p {
          position: relative;
          margin-left: 10px;
          padding-left: 10px;
          padding-right: 10px;
          line-height: 20px;
          &::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 6px;
            width: 6px;
            height: 6px;
            background-color: @theme-color-1;
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>
