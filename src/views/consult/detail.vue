<template>
  <div class="detail-container consult">
    <loading v-if="loading" tip="数据加载中..." size="large" />

    <!-- 上部表格 -->
    <div class="top">
      <a-descriptions bordered :column="1">
        <a-descriptions-item label="问题内容">
          {{ consult.Q_content | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="问题类型">
          <a-tag color="orange"> {{ consult.K_type | placeholder }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="知识链接">
          {{ consult.K_link | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="问题回答">
          {{ consult.Q_answer | placeholder }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <!-- 中间表格 -->
    <div class="middle">
      <a-descriptions bordered :column="1">
        <a-descriptions-item label="参考文献">
          {{ consult.Source | placeholder }}
        </a-descriptions-item>
        <a-descriptions-item label="来源书籍">
          {{ consult.B_name | placeholder }} ( ISBN:
          {{ consult.B_ISBN | placeholder }} )
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="bottom">
      <!-- 链接图片 -->
      <a-descriptions bordered v-if="consult.islinkUrl === 1" :column="1">
        <a-descriptions-item :label="consult.linkPS1">
          <ul class="picture">
            <li>
              <img
                v-for="(item, index) in consult.linkUrl1"
                :key="index"
                :src="item"
                alt=""
              />
            </li>
          </ul>
        </a-descriptions-item>
        <a-descriptions-item v-if="consult.linkUrl2" :label="consult.linkPS2">
          <ul class="picture">
            <li>
              <img
                v-for="(item, index) in consult.linkUrl2"
                :key="index"
                :src="item"
                alt=""
              />
            </li>
          </ul>
        </a-descriptions-item>
      </a-descriptions>
      <!-- 回答图片 -->
      <a-descriptions bordered v-if="consult.isanswerUrl === 0" :column="1">
        <a-descriptions-item :label="consult.answerPS1">
          <ul class="picture">
            <li>
              <img
                v-for="(item, index) in consult.answerUrl1"
                :key="index"
                :src="item"
                alt=""
              />
            </li>
          </ul>
        </a-descriptions-item>
        <a-descriptions-item
          v-if="consult.answerUrl2"
          :label="consult.answerPS2"
        >
          <ul class="picture">
            <li>
              <img
                v-for="(item, index) in consult.answerUrl2"
                :key="index"
                :src="item"
                alt=""
              />
            </li>
          </ul>
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script>
import { _getOne } from '@/services/api/consult';
export default {
  data() {
    return {
      consult: {
        B_ISBN: '978-7-117-24071-0',
        B_name: '骨质疏松用药咨询标准化手册',
        D_ID: '5',
        K_link:
          '1985年鲑鱼降钙素被美国FDA批准上市，同时也进入英国药典。它主要用于治疗变形性骨炎、恶性高钙血症和骨质疏松症。鲑鱼降钙素的活性比哺乳动物高30倍。鲑鱼降钙素传统剂型有注射剂、鼻喷剂，近年来一些研究也采用颊膜、口服和肺部给药等方式。其中鼻喷剂是临床常用的给药方式，它可以改善注射给药造成患者不易耐受、顺应性低、易发生过敏反应等缺点。',
        K_type: '用药方法',
        Q_answer:
          'A.鲑鱼降钙素喷鼻装置使用用法（生产企业：银谷制药有限责任公司，商品名：金尔力）。1.取下瓶盖。2.首次使用喷鼻剂之前（每瓶一喷包装规格的除外，1喷/瓶规格的包装无需提前按压，拆开外包装后即为待使用状态，直接放入鼻腔后按压一次即可），手持鼻喷瓶，用力按压瓶帽，至出现咔喀声，然后放松，重复操作2～3次，以便启动排气泵直至释放均匀细小的气雾。鼻喷瓶已准备好使用了。3.将头略向前倾，将鼻喷瓶口插入一侧鼻孔，确保瓶口与鼻腔成直线，以便喷剂充分扩散，按压瓶帽一次然后松开。4.喷压一个剂量后，用鼻子深吸气几次，以免药液流出鼻孔。不要立即用鼻孔呼气。5.如果医生嘱咐一次用药两喷，在另一个鼻孔重复操作一次。若用药一喷仅喷一个鼻孔即可，而且每次交替喷鼻孔，不要仅喷一侧，避免长期刺激鼻黏膜。6.每次用完后盖好瓶盖，以免瓶口堵塞。7.喷药到规定次数后，尚有小部分药液残留在瓶中。8.一旦使用，喷雾瓶应贮藏在室温下，并且在一个月内用完。9.如果喷雾器阻塞，可以通过强力按压启动装置来解除，请不要使用尖锐的物体，避免损伤喷雾器。B.鲑鱼降钙素鼻喷剂（生产企业：Novartis Pharma Schweiz AG，Switzerland，商品名：密盖息）给药装置使用说明：在首次使用鼻喷瓶前，按压驱动装置三次以启动喷药泵（直到鼻喷瓶颈边缺口的计数窗显示绿色）。无论何时若喷药嘴阻塞，请用力按压驱动装置以排除阻塞，但千万不要用针或其他尖锐的物体来排除阻塞因为这样可能会损坏喷药装置。1.取下瓶盖。2.初次使用。如图所示（图1）手持鼻喷瓶，用力按压瓶帽，至出现“咔嗒”声，然后放松。重复操作三次，瓶帽缺口显示绿色，鼻喷瓶已准备好可使用了。3.将头略向前倾，将鼻喷瓶口插入一侧鼻孔，确保瓶口与鼻腔成直线，以便鼻喷剂充分扩散。按压瓶帽一次然后松开，瓶帽缺口计数窗显示1。4.喷药一个剂量后，用鼻子深吸气几次以免药液流出鼻孔。不要立即用鼻孔呼气。5.如果医生嘱咐一次用药两喷，在另一个鼻孔重复操作一次。6.每次用完后盖好瓶盖，以免瓶口堵塞。7.喷药16次后，瓶帽缺口显示红色标记并且按压瓶帽会感到明显的阻力（警告停止）。小部分药液（技术余量）残留在瓶中。8.任何情况下都不要试图用针或尖锐物品扩大喷嘴，这将损坏装置，不要拆开装置，如果有疑问请向医生咨询，为保证药量充足，在贮存和运输的过程中应直立放置。9.鼻喷瓶一旦开启使用，必须在室温放置，最长可使用四周。密盖息鼻喷剂具体操作如图1：',
        Q_content:
          '张大爷由于骨质疏松，医 生处方鲑鱼降钙素鼻喷剂，他自述按说明书操作药液总喷不进鼻子，药液都流出来了。另外，他也不清楚处方中的“喷1喷”是一个鼻孔喷一下吗？想问问到底该怎么使用？',
        Source:
          '[1]鲑鱼降钙素喷鼻剂药品说明书，生产企业：银谷制药有限责任公司，商品名：金尔力，修改日期：2012年2月1日[2]鲑鱼降钙素喷鼻剂药品说明书，生产企业：Novartis Pharma Schweiz AG，Switzerland，商品名：密盖息，修改日期：2013年4月11日',
        answerPS1: '图1　密盖息鼻喷剂具体操作',
        answerPS2: '图2　鼻喷剂使用注意事项',
        answerUrl1: '5-31-1图1.png',
        answerUrl2: '5-31-2图2.png',
        id: '050031',
        isanswerUrl: 0,
        islinkUrl: null,
        linkPS1: null,
        linkPS2: null,
        linkUrl1: null,
        linkUrl2: null
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
        this.consult = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
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
  }
  .bottom {
    width: 100%;

    .picture {
      width: 100%;
      display: flex;
      padding: 16px 24px;
      li {
        img {
          width: 50%;
        }
      }
    }
  }
}
</style>
