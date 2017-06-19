<template>
    <div>
      <form >
        <div class="form-group">
          <label for="bookName" class="control-label">书名</label>
          <input type="text" id="bookName" class="form-control" placeholder="请输入书名" autocomplete="off" v-model="book.bookName">
        </div>
        <div class="form-group">
          <label for="bookCover" class="control-label">书面</label>
          <input type="text" id="bookCover" class="form-control" placeholder="请输入书面" autocomplete="off" v-model="book.bookCover">
        </div>
        <div class="form-group">
          <label for="bookPrice" class="control-label">书价</label>
          <input type="text" id="bookPrice" class="form-control" placeholder="请输入书价" autocomplete="off" v-model="book.bookPrice">
        </div>
        <div class="form-group">
          <button class="btn btn-primary" type="button" @click="add">添加图书</button>
        </div>
      </form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
              book:{//图书的每一个属性有一个默认值
                bookName:'',
                bookCover:'',
                bookPrice:''
              }
            }
        },
        components: {},
        methods: {
          add(){
            this.$http.post('/book',this.book).then(()=>{
              //传的参数this.book指的是在输入框填写号的内容通过post请求传入后台
              this.$router.push('/list')//保存好填写的图书信息后跳转去列表页
            })

          }
        }
    }
</script>
<style scoped>

</style>
