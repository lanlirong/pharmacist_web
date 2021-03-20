<template>
  <div class="introduction">
    <ul class="intro-container">
      <li>
        <h2>功能介绍</h2>
        <div class="des">
          <p>可视化展示药物有效成分之间的相互作用关系。</p>
          <p>
            输入药物名称，获得相互作用结果汇总，进入详情页后展示相互作用关系图，点击图上的卡片获得单条作用信息。
          </p>
        </div>
      </li>
      <li>
        <h2>数据说明</h2>
        <div class="des">
          <p>药物相互作用数据库目前累记收录{{ count }}条数据。</p>
          <p>
            数据包括药物与相互作用物质的相互作用结果，临床建议，部分数据提供临床证据、证据等级和参考文献。
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
import { _getInteractionCount } from '@/services/api/interaction';
export default {
  data() {
    return {
      count: '---'
    };
  },
  mounted() {
    this.getInteractionCount();
  },
  methods: {
    async getInteractionCount() {
      const { data } = await _getInteractionCount();
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
