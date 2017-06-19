<template>
  <div>
    <div class="col-md-3" v-for="book in books">
      <div class="panel panel-warning">
        <div class="panel-heading">书名:{{book.bookName}}</div>
        <div class="panel-body text-center" >
          <img :src="book.bookCover" ></div>
        <div class="panel-footer">价格:{{book.bookPrice | currency('￥')}}
          <router-link :to="{name:'detail',params:{id:book.id}}">进入详情</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

    created(){//获取数据
      this.$http.get('/book').then((res)=>{
        //console.log(res)  一个对象 其中res.body这个属性保存着所有图书的信息
        this.books= res.body
      })
    },
    filters:{
      currency(input,param1){//input=book.bookPrice  param1=￥
        return param1+input
      }
    },
    data(){
      return {books:[]}
    },
    components: {},
    methods: {}
  }
</script>
<style scoped>
  /*.panel-body{text-align: center}*/
  img{width: 150px;
    height: 200px;}
</style>
