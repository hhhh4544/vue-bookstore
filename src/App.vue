<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="row"><!--内容切换到组件中-->
        <div class="col-md-12">
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
export default {//当前组件注册子组件
  components:{
    Navbar
  }
}
</script>

<style>

</style>
