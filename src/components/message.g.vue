<template>
  <div class="message">
    <!-- /客服图标 -->
    <div v-if="!showWindow" class="customer" @click="showChat">
      <a-tooltip placement="left">
        <template slot="title">
          <span>联系我们</span>
        </template>
        <div class="chart-icon">
          <div class="ani-1"></div>
          <div class="ani-2"></div>
          <div class="ani-3"></div>
          <svg-icon class="message-icon" iconClass="message" />
        </div>
      </a-tooltip>
    </div>

    <!-- chat -->
    <div v-if="showWindow" class="chat-container">
      <a-icon class="close" type="close" @click="close" />
      <div class="msg-container">
        <ul>
          <li
            v-for="(item, index) in msgList"
            :key="index"
            :class="{ 'my-msg': item.type != 0 }"
          >
            <div class="time">{{ item.time }}</div>
            <div class="messages">
              <a-avatar v-if="item.type == 0" slot="avatar" :src="avator" />
              <div class="msg">
                <a-icon class="arrow" type="caret-left" />{{ item.msg }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="input-msg">
        <a-textarea
          v-model="msg"
          placeholder="输入留言"
          :auto-size="{ minRows: 3, maxRows: 3 }"
        />
        <a-button type="link" @click="send">
          发送
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { _sendUserMsg, _getMsgList } from '@/services/api/user.js';
export default {
  name: 'message',
  data() {
    return {
      showWindow: false,
      msg: '临床可以合用而无须调整剂量。',
      avator: require('@/assets/images/chat.png'),
      msgList: []
    };
  },
  mounted() {
    this.getMsgList();
  },
  methods: {
    showChat() {
      if (localStorage.getItem('phamarcist_user')) {
        this.showWindow = true;
      } else {
        this.$message.warning('请先注册并登录系统');
      }
    },
    close() {
      this.showWindow = false;
    },
    async send() {
      let sedForm = {
        msg: this.msg,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss')
      };
      const { code } = await _sendUserMsg(sedForm);
      if (code == 1) {
        sedForm.type = 1;
        this.msgList.push(sedForm);
        this.msg = '';
      } else {
        this.$message.error('消息发送失败，请重新发送');
      }
    },
    async getMsgList() {
      const { data } = await _getMsgList();
      this.msgList = (data || []).sort((a, b) => a.id - b.id);
      console.log(this.msgList);
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  position: fixed;
  bottom: 200px;
  right: 10px;
  z-index: 99;
  .customer {
    width: 50px;
    .chart-icon {
      position: relative;
      .ani-1,
      .ani-2,
      .ani-3 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-20px, -20px);
        border: 1px solid #ee6f2d;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        opacity: 0.5;

        animation-name: msgicon;
        animation-duration: 3s;
        animation-iteration-count: infinite;
      }
      .ani-2 {
        animation-delay: 0.5s;
      }
      .ani-3 {
        animation-delay: 1s;
      }
      .message-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-20px, -20px);

        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }
  }

  .chat-container {
    position: fixed;
    bottom: 0;
    right: 0px;
    z-index: 99;
    width: 400px;
    height: 600px;
    border: 1px solid @theme-color-1;
    border-radius: 4px;
    background-color: #f1f2f5;
    box-shadow: @box-shadow;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .close {
      align-self: flex-end;
      color: #aaa;
    }
    .msg-container {
      flex: 1;
      height: calc(100% - 80px);
      padding-bottom: 20px;
      ul {
        height: 100%;
        overflow-y: scroll;
        li {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
          .time {
            font-size: 12px;
            color: #ccc;
            margin-left: 46px;
            margin-bottom: 6px;
          }
          .messages {
            display: flex;
            .msg {
              padding-left: 10px;
              background-color: #fff;
              border-radius: 4px;
              padding: 10px 20px;
              margin-left: 10px;
              position: relative;
              .arrow {
                position: absolute;
                top: 50%;
                left: -10px;
                margin-top: -7px;
                color: #fff;
              }
            }
          }
        }
        .my-msg {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .messages {
            display: flex;
            .msg {
              background-color: @theme-color-1;
              color: #fff;
              position: relative;
              .arrow {
                position: absolute;
                top: 50%;
                right: -100%;
                transform: rotateY(180deg);
                margin-right: -14px;
                color: @theme-color-1;
              }
            }
          }
        }
      }
    }
    .input-msg {
      height: 80px;
      display: flex;
      align-items: flex-end;
      .ant-btn-link {
        padding-right: 0;
      }
    }
  }
}
@keyframes msgicon {
  from {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-20px, -20px);
    border: 1px solid #ee6f2d;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    opacity: 0.5;
  }
  to {
    transform: translate(-25px, -25px);
    border: 3px solid #ee6f2d;
    border-radius: 25px;
    width: 50px;
    height: 50px;
    opacity: 0;
  }
}
</style>
