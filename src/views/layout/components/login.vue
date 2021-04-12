<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="username" label="账号" prop="username">
      <a-input
        v-model="form.username"
        placeholder="请输入注册过的账号"
        @blur="
          () => {
            $refs.username.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    <a-form-model-item ref="password" label="密码" prop="password">
      <a-input
        v-model="form.password"
        type="password"
        autocomplete="off"
        @blur="
          () => {
            $refs.password.onFieldBlur();
          }
        "
      />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button @click="cancel">
        取消
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        重置
      </a-button>
      <a-button style="margin-left: 10px;" type="primary" @click="onSubmit">
        登录
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        username: 'user6',
        password: '123456'
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
          }
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
