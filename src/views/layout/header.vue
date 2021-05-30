<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/images/logo.png" />
      </router-link>
    </div>
    <ul class="menu">
      <li><svg-icon icon-class="mini" />小程序</li>
      <li class="name" v-if="!userInfo || !userInfo.name" @click="toLogin">
        <svg-icon icon-class="login" />
        <span>登录/注册</span>
      </li>
      <li v-else>
        <a-badge v-if="infoCount !== 0" dot>
          <svg-icon v-if="!userInfo.avatar" icon-class="login" />
          <a-avatar v-else :src="userInfo.avatar" size="small" />
        </a-badge>
        <svg-icon v-else icon-class="login" />
        <!-- <span >你好，{{ userInfo.name }} </span> -->
        <a-dropdown>
          <span class="ant-dropdown-link" @click="e => e.preventDefault()">
            你好，<span class="name">{{ userInfo.name }}</span>
            <a-icon type="down" />
          </span>

          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="showInfo">个人信息</a>
            </a-menu-item>
            <a-menu-item>
              <a-badge :count="infoCount" :offset="[20, 6]">
                <a href="javascript:;">系统消息</a>
              </a-badge>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a href="javascript:;" @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </li>
    </ul>
    <!-- 注册登录 -->
    <a-modal
      v-model="visible"
      :footer="null"
      :keyboard="false"
      :maskClosable="false"
      :closable="false"
      :destroyOnClose="true"
      centered
    >
      <a-tabs type="card" :activeKey="activeKey" @change="changeTab">
        <a-tab-pane key="1" tab="登录">
          <login
            :confirmLoading="loginLoading"
            @comfirm="login"
            @cancel="cancel"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <register
            :confirmLoading="registerLoading"
            @comfirm="register"
            @cancel="cancel"
          />
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import login from './components/login';
import register from './components/register';
import { _login, _logout } from '@/services/api/user.js';
import { getCookie } from '@/utils/tool.js';

export default {
  components: {
    login,
    register
  },
  data() {
    return {
      myVisible: false,
      visible: false,
      registerLoading: false,
      loginLoading: false,
      activeKey: '1',
      userInfo: {},
      infoCount: 3
    };
  },
  mounted() {
    let user = localStorage.getItem('phamarcist_user');
    let uer_cookie = getCookie('PHPSESSID');
    if (user && uer_cookie) {
      this.userInfo = JSON.parse(user);
    }
  },
  methods: {
    toLogin() {
      this.visible = true;
    },
    showModal() {
      this.visible = true;
    },

    changeTab(key) {
      this.activeKey = key;
    },
    async login(val) {
      this.registerLoading = true;
      try {
        const { code, data } = await _login(val);
        if (code == 1) {
          localStorage.setItem('phamarcist_user', JSON.stringify(data));
          this.userInfo = data;
          this.$message.success('登录成功');
          this.visible = false;
        }
        this.registerLoading = false;
      } catch (error) {
        this.registerLoading = false;
      }
    },
    async register(val) {
      this.registerLoading = true;
      try {
        const { code } = this.$ajax({
          url: '/user/register',
          method: 'post',
          data: val,
          headers: { 'content-type': 'multipart/form-data' }
        });
        if (code == 1) {
          this.$message.success('注册成功');
          this.activeKey = '1';
        }
        this.registerLoading = false;
      } catch (error) {
        this.registerLoading = false;
      }
    },
    async logout() {
      const { code } = await _logout();
      if (code == 1) {
        localStorage.removeItem('phamarcist_user');
        this.userInfo = null;
        this.$message.success('您已退出登录');
        this.$router.replace('/');
      }
    },
    cancel() {
      this.visible = false;
    },
    showInfo() {
      this.$router.push('/myInfo');
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  min-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  color: @text-color;
  font-size: 14px;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: @border;
  .logo {
    height: 50px;
    img {
      height: 100%;
    }
  }
  .menu {
    display: flex;
    flex-direction: row;
    .svg-icon {
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 5px;
    }
    li {
      margin-left: 20px;
      cursor: pointer;
      vertical-align: middle;
    }
    .name {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      max-width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
