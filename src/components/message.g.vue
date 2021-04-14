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
          <li>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <div class="msg">
              <a-icon class="arrow" type="caret-left" />ipayobjects.com/rmspo
            </div>
          </li>
          <li>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <div class="msg">
              <a-icon class="arrow" type="caret-left" />ipayobjects.com/rmspo
            </div>
          </li>
          <li>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <div class="msg">
              <a-icon class="arrow" type="caret-left" />ipayobjects.com/rmspo
            </div>
          </li>
          <li class="my-msg">
            <a-avatar
              v-if="false"
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <div class="msg">
              ipayobjects.com/rmspo <a-icon class="arrow" type="caret-left" />
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
        <a-button type="link">
          发送
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  data() {
    return {
      showWindow: true,
      msg: ''
    };
  },
  methods: {
    showChat() {
      this.showWindow = true;
      console.log(11);
    },
    close() {
      this.showWindow = false;
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
        opacity: 0.7;

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
      color: #ccc;
    }
    .msg-container {
      flex: 1;
      ul {
        li {
          display: flex;
          margin-top: 20px;
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
        .my-msg {
          display: flex;
          flex-direction: row-reverse;
          .msg {
            background-color: @theme-color-1;
            color: #fff;
            position: relative;
            .arrow {
              position: absolute;
              top: 50%;
              right: 0;
              //   margin-top: -7px;
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
    opacity: 0.7;
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
