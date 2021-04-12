<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item hasFeedback ref="username" label="账号" prop="username">
      <a-input v-model="form.username" placeholder="请输入登录账号" />
    </a-form-model-item>
    <a-form-model-item ref="password" label="密码" prop="password">
      <a-input
        v-model="form.password"
        placeholder="请输入6位以上密码"
        type="password"
        autocomplete="off"
        @blur="
          () => {
            $refs.password.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    <a-form-model-item has-feedback label="确认密码" prop="checkPassword">
      <a-input
        v-model="form.checkPassword"
        placeholder="请再次输入密码"
        type="password"
        autocomplete="off"
      />
    </a-form-model-item>
    <a-form-model-item ref="name" label="名字" prop="name">
      <a-input
        v-model="form.name"
        @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    <a-form-model-item hasFeedback ref="phone" label="电话" prop="phone">
      <a-input v-model="form.phone" />
    </a-form-model-item>
    <a-form-model-item hasFeedback ref="email" label="邮箱" prop="email">
      <a-input v-model="form.email" />
    </a-form-model-item>
    <a-form-model-item label="性别">
      <a-radio-group v-model="form.sex">
        <a-radio value="0">
          男
        </a-radio>
        <a-radio value="1">
          女
        </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item ref="job" label="职业" prop="job">
      <a-input v-model="form.job" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button @click="cancel">
        取消
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        重置
      </a-button>
      <a-button
        :loading="confirmLoading"
        style="margin-left: 10px;"
        type="primary"
        @click="onSubmit"
      >
        注册
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import {
  _checkUsername,
  _checkPhone,
  _checkEmail
} from '@/services/api/user.js';
export default {
  props: {
    confirmLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let validateUsername = async (rule, value, callback) => {
      const { data, code } = await _checkUsername({
        username: this.form.username
      });
      if (code == 1 && !data) {
        callback();
      } else if (code == 1 && data) {
        callback(new Error('账号已存在'));
      } else {
        callback(new Error('验证失败'));
      }
    };
    let validatePhone2 = async (rule, value, callback) => {
      if (value == '') {
        callback();
        return;
      }
      const { data, code } = await _checkPhone({
        phone: this.form.phone
      });
      if (code == 1 && !data) {
        callback();
      } else if (code == 1 && data) {
        callback(new Error('号码已存在'));
      } else {
        callback(new Error('验证失败'));
      }
    };
    let validateEmail2 = async (rule, value, callback) => {
      if (value == '') {
        callback();
        return;
      }
      const { data, code } = await _checkEmail({
        email: this.form.email
      });
      if (code == 1 && !data) {
        callback();
      } else if (code == 1 && data) {
        callback(new Error('邮箱已存在'));
      } else {
        callback(new Error('验证失败'));
      }
    };
    let validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value == '') {
        callback();
        return;
      }
      var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
      var isMob = /^[0-9]{11}$/;
      if (!isPhone.exec(value) && !isMob.exec(value)) {
        callback(new Error('请输入正确的电话号码'));
      } else {
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      if (value == '') callback();
      var reg = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.exec(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        username: 'user2',
        password: '123456',
        checkPassword: '123456',
        name: '张小张',
        phone: '',
        email: '34524562@qq.com',
        sex: '1',
        job: '高校老师'
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '账号长度在1-20个字符之间',
            trigger: 'blur'
          },
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '密码长度在6-20个字符之间',
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          { validator: validatePassword2, trigger: 'change' }
        ],
        name: [
          {
            max: 50,
            message: '名字最大长度50',
            trigger: 'blur'
          }
        ],
        phone: [
          { validator: validatePhone, trigger: 'change' },
          { validator: validatePhone2, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'change' },
          { validator: validateEmail2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('comfirm', this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>
