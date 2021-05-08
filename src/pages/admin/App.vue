<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {}
  }
</script>

<style lang="less">
  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    background-color: #324157;
  }
  #app {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .v-md-plugin-tip p {
    margin-top: 1em !important;
    margin-bottom: 1em !important;
  }

  .github-markdown-body {
    line-height: 2 !important;
  }

  .github-markdown-body > :first-child,
  .github-markdown-body > :first-child > :first-child {
    margin-top: 0 !important;
  }

  img {
    max-width: 1000px !important;
  }
</style>
