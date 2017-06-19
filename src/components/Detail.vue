<template>
  <div>
    <div>
      <div class="panel panel-warning">
        <div class="panel-heading">书名:
          <span v-show="!flag">{{book.bookName}}</span>
          <input type="text" v-model="book.bookName" v-show="flag"></div>
        <div class="panel-body text-center" ><img :src="book.bookCover" alt=""></div>
        <div class="panel-footer">价格:
          <span v-show="!flag" >{{book.bookPrice | currency('￥')}}</span>
          <input type="text" v-model="book.bookPrice" v-show="flag"></div>

        <button class="btn btn-danger" @click="remove" v-show="!flag">请删除</button>
        <button class="btn btn-primary" v-show="!flag" @click="changeFlag">请修改</button>
        <button class="btn btn-warning" v-show="flag" @click="update">确认修改</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

    created(){//获取数据
      this.id=this.$route.params.id
      this.$http.get('/book?id='+this.id).then((res)=>{
        this.book= res.body
        console.log(res)

      //console.log(this) VueComponent {_uid: 16, _isVue: true, $options: Object, _renderProxy: Proxy, _self: VueComponent…}
    })

    },
    filters:{
      currency(input,param1){//input=book.bookPrice  param1=￥
        return param1+input
      }
    },
    data(){
      return {book:{
        bookName:'',
        bookCover:'',
        bookPrice:''
      },
      id:'',
      flag:false
      }
    },
    components: {},
    methods: {
      update(){
        this.$http.put('/book?id='+this.id,this.book).then(()=>{
          this.flag=false  //this.book修改后整本图书的信息
        })
      },
      changeFlag(){
        this.flag=!this.flag
      },

      remove(){
        this.$http.delete('/book?id='+this.id)
      .then(()=>{
        this.$router.push('/list')
      })
    }
    }}
</script>
<style scoped>

</style>
