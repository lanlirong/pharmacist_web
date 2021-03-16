<template>
  <div class="introduction">
    <ul class="intro-container">
      <li>
        <h2>功能介绍</h2>
        <div class="des">
          <p>xxxxxxxsdfgfhghghgxxxxxxxsdfgfhghghg</p>
          <p>xxxxxxxsdfgfhghghg</p>
          <p>xxxxxxxsdfgfhghghg</p>
        </div>
      </li>
      <li>
        <h2>数据说明</h2>
        <div class="des">
          <p>xxxxxxxsdfgfhghghg</p>
          <p>xxxxxxxsdfgfhghghg</p>
          <p>xxxxxxxsdfgfhghghg哈哈哈的呢姐姐</p>
        </div>
      </li>
      <li>
        <h2>其他说明</h2>
        <div class="des">
          <p>xxxxxxxsdfgfhghghg</p>
          <p>xxxxxxxsdfgfhghghg</p>
          <p>xxxxxxxsdfgfhghghg</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.introduction {
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  margin-top: 80px;
  background-color: #fff;
  .intro-container {
    width: 1200px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
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
      border-left: 4px solid #8597b6;
      color: #8597b6;
      padding-left: 10px;
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 10px;
    }
  }
}
</style>
