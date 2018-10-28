<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    // 调用API从本地缓存中获取数据
    const logs = this.getStorageSync('logs') || []
    logs.unshift(Date.now())
    this.setStorageSync('logs', logs)
  }
}
</script>

<style lang="less">

</style>
