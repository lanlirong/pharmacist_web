import Vue from 'vue';

const filters = {
  //占位符
  placeholder(val, placeholder = '---') {
    return !val ? placeholder : val;
  },
  //溢出显示省略号
  subStr(val, length = 20) {
    return val.length <= length ? val : val.substr(0, length) + '…';
  }
};

for (let key in filters) {
  Vue.filter(key, filters[key]);
}

export default filters;
