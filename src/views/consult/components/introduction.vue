<template>
  <div class="introduction">
    <ul class="intro-container">
      <li>
        <h2>功能介绍</h2>
        <div class="des">
          <p>常见疾病的用药咨询及标准化解答</p>
          <p>
            提供关键词查询和书名查询。关键词默认查询全部字段，也提供单选框选择，从一个字段中匹配；书名查询只能下拉选择。
          </p>
        </div>
      </li>
      <li>
        <h2>数据说明</h2>
        <div class="des">
          <p>用药咨询数据库目前累记收录{{ count }}条数据。</p>
          <p>
            数据包括问题内容、问题回答，部分问题给予相关知识链接。
            数据主要摘录于用药咨询标准化手册，文末给出参考文献以及来源书籍。
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
import { _getConsultCount } from '@/services/api/consult';
export default {
  data() {
    return {
      count: '---'
    };
  },
  mounted() {
    this.getConsultCount();
  },
  methods: {
    async getConsultCount() {
      const { data } = await _getConsultCount();
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
