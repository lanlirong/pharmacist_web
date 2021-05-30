<template>
  <div class="myInfo">
    <div class="title">个人信息</div>
    <!-- 头像 -->
    <div class="avatar-container">
      <a-upload
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :withCredentials="true"
        :action="serviceUrl"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <ul>
      <li>
        <div class="info">
          <div class="label">账号</div>
          <div class="value">
            {{ myInfo.username }}
          </div>
        </div>
      </li>
      <li>
        <div class="info">
          <div class="label">密码</div>
          <div class="value password">
            <span v-if="!passwordV">
              <span v-if="!passwordVisible">*******</span
              ><span v-else> {{ myInfo.password }}</span
              ><a-icon
                v-if="!passwordVisible"
                @click="passwordVisible = !passwordVisible"
                type="eye"
              /><a-icon
                v-else
                @click="passwordVisible = !passwordVisible"
                type="eye-invisible"
              />
            </span>
            <a-input-search
              v-else
              placeholder=""
              v-model="editForm.value"
              enter-button="确认"
              @search="onEditPassword"
            />
          </div>
        </div>
        <div class="edit" v-if="!passwordV" @click="passwordV = true">
          <a-icon type="edit" />
        </div>
        <div class="cancel" v-else @click="cancelPassword">取消</div>
      </li>
      <li>
        <div class="info">
          <div class="label">姓名</div>
          <div class="value">
            {{ myInfo.name }}
          </div>
        </div>
      </li>

      <li>
        <div class="info">
          <div class="label">邮箱</div>
          <div class="value">
            <span v-if="!emailV">
              <span v-if="!myInfo.email">未绑定</span
              ><span v-else>{{ myInfo.email }}</span>
            </span>
            <a-input-search
              v-else
              placeholder=""
              v-model="editForm.value"
              enter-button="确认"
              @search="onEditEmail"
            />
          </div>
        </div>
        <div class="edit" v-if="!emailV" @click="emailV = true">
          <a-icon type="edit" />
        </div>
        <div class="cancel" v-else @click="cancelEmail">取消</div>
      </li>
      <li>
        <div class="info">
          <div class="label">电话</div>
          <div class="value">
            <span v-if="!phoneV">
              <span v-if="!myInfo.phone">未绑定</span
              ><span v-else>{{ myInfo.phone }}</span>
            </span>
            <a-input-search
              v-else
              placeholder=""
              v-model="editForm.value"
              enter-button="确认"
              @search="onEditPhone"
            />
          </div>
        </div>
        <div class="edit" v-if="!phoneV" @click="phoneV = true">
          <a-icon type="edit" />
        </div>
        <div class="cancel" v-else @click="cancelPhone">取消</div>
      </li>
      <li>
        <div class="info">
          <div class="label">性别</div>
          <div class="value">{{ sexs[myInfo.sex] }}</div>
        </div>
      </li>
      <li>
        <div class="info">
          <div class="label">职业</div>
          <div class="value">{{ myInfo.job }}</div>
        </div>
      </li>
      <li>
        <div class="info">
          <div class="label">注册时间</div>
          <div class="value">{{ myInfo.createTime }}</div>
        </div>
      </li>
    </ul>
    <svg-icon class="my-info-2" iconClass="my-info-2" />
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
import { _editMyInfo, _checkEmail, _checkPhone } from '@/services/api/user.js';
import Axios from '@/services/http-interceptors';
export default {
  name: 'myInfo',
  data() {
    return {
      myInfo: {},
      sexs: ['男', '女'],
      passwordVisible: false,
      passwordV: false,
      emailV: false,
      phoneV: false,
      editForm: {
        type: '',
        value: ''
      },
      loading: '',
      imageUrl: '',
      serviceUrl: Axios.defaults.baseURL + '/user/editAvatar'
    };
  },
  mounted() {
    let myInfo = localStorage.getItem('phamarcist_user');
    if (myInfo) {
      this.myInfo = JSON.parse(myInfo);
      this.imageUrl = this.myInfo.avatar;
      this.myInfo.phone =
        this.myInfo.phone.substr(0, 3) +
        '****' +
        this.myInfo.phone.substr(
          this.myInfo.phone.length - 4,
          this.myInfo.phone.length
        );
    }
  },
  methods: {
    async onEditEmail() {
      this.emailV = true;
      this.editForm.type = 'email';
      var reg = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.exec(this.editForm.value)) {
        this.$message.error('请输入正确的邮箱');
        return;
      }
      const { code, data } = await _checkEmail({ email: this.editForm.value });
      if (code == 1 && !data) {
        this.onEdit();
      } else {
        this.$message.error('邮箱已存在');
      }
    },
    async onEditPhone() {
      this.emailV = true;
      this.editForm.type = 'phone';
      var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
      var isMob = /^[0-9]{11}$/;
      if (
        !isPhone.exec(this.editForm.value) &&
        !isMob.exec(this.editForm.value)
      ) {
        this.$message.error('请输入正确的电话号码');
        return;
      }
      const { code, data } = await _checkPhone({ phone: this.editForm.value });
      if (code == 1 && !data) {
        this.onEdit();
      } else {
        this.$message.error('电话已被绑定');
      }
    },
    async onEditPassword() {
      this.passwordV = true;
      this.editForm.type = 'password';
      if (this.editForm.value.length < 6 || this.editForm.value.length > 20) {
        this.$message.error('密码长度在6-20个字符之间');
        return;
      } else {
        this.onEdit();
      }
    },
    async onEdit() {
      const { code } = await _editMyInfo({
        ...this.editForm,
        id: this.myInfo.id
      });
      if (code == 1) {
        let myInfo = JSON.parse(localStorage.getItem('phamarcist_user'));
        myInfo[this.editForm.type] = this.editForm.value;
        localStorage.setItem('phamarcist_user', JSON.stringify(myInfo));
        this.myInfo[this.editForm.type] = this.editForm.value;
        this.clearData();
        this.$message.success('修改成功');
      }
    },
    cancelPassword() {
      this.passwordV = false;
      this.clearData();
    },
    cancelPhone() {
      this.phoneV = false;
      this.clearData();
    },
    cancelEmail() {
      this.emailV = false;
      this.clearData();
    },
    clearData() {
      this.passwordV = false;
      this.emailV = false;
      this.phoneV = false;
      this.editForm.type = '';
      this.editForm.value = '';
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        this.loading = false;
        if (info.file.response.code == 1) {
          let myInfo = JSON.parse(localStorage.getItem('phamarcist_user'));
          myInfo['avatar'] = info.file.response.data;
          localStorage.setItem('phamarcist_user', JSON.stringify(myInfo));
          location.reload();
          this.$message.success(info.file.response.msg);
        } else {
          this.$message.error(info.file.response.msg);
        }
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('只能上传jpeg、jpg、png格式!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
      }
      return isJpgOrPng && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
.myInfo {
  width: 1200px;
  margin: 20px auto;
  padding: 20px 200px;
  background-color: #fff;
  // background: url('../../');
  border-radius: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .avatar-container {
    width: 80px;
    height: 80px;
    position: absolute;
    right: 260px;
    top: 20px;
    cursor: pointer;
    .avatar-uploader {
      width: 80px;
      height: 80px;
      img {
        width: 80px;
        height: 80px;
      }
    }
  }

  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 20px;
    padding-left: 20px;
  }
  ul {
    width: 100%;
    margin-bottom: 40px;
    z-index: 2;
    li {
      // height: 80px;
      padding: 10px 20px;
      width: 100%;
      list-style: none;
      border-bottom: @border;
      display: flex;
      align-items: center;
      justify-content: center;
      .info {
        flex: 1;
        line-height: 20px;
        .label {
          margin-bottom: 10px;
          font-size: 16px;
          color: #000;
        }
        .value {
          color: #8590a6;
          padding-right: 20px;
        }
        .password {
          span {
            margin-right: 10px;
          }
        }
      }
      .edit {
        width: 50px;
        font-size: 18px;
        cursor: pointer;
        align-self: flex-end;
      }
      .cancel {
        width: 50px;
        cursor: pointer;
        align-self: flex-end;
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
  }

  .my-info-2 {
    position: absolute;
    bottom: 10px;
    right: -60px;
    transform: rotateY(180deg);
  }
}
</style>
