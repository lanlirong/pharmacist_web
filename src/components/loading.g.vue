<template>
  <div class="spin-container">
    <a-spin :tip="tip" :size="size" />
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    tip: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['small', 'default', 'large'].includes(val);
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.spin-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
