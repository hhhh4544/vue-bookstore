//主要提供接口
//我们对书的增删改查操作的是json
let http=require('http')
let fs=require('fs')
let url=require('url')
let mime=require('mime')
function readBooks(callback) {
  fs.readFile('./books.json','utf8',function (err,data) {
    if(err||data.length==0)data='[]'
    callback(JSON.parse(data))
  })
}
//readBooks(function (data) {console.log(data)})
function writeBooks(data,callback) {
  fs.writeFile('./books.json',JSON.stringify(data),callback)
}
//writeBooks([{name:1}],function () {console.log('ok')})
http.createServer(function (req,res) {
  let {pathname}=url.parse(req.url,true)
  let {query}=url.parse(req.url,true)
  if (pathname=='/book'){
    let id=query.id
    switch (req.method){
      case 'GET':
       if(id){//查到那本书
         readBooks(function (data) {//这里的data代表要查询的那本书
           var book=data.find((item)=>{
             return item.id==id
             //如果可以找到，返回找到的那一项否则返回undefined
           })
           res.end(JSON.stringify(book))
         })

       }else {
         readBooks(function (data) {//此时的data代表所有书
           res.end(JSON.stringify(data))
         })
       }
        break;
      case 'POST':  //增加图书
        var str=''
        req.on('data',function (data) {
          str+=data
        })
        req.on('end',function () {
          var book=JSON.parse(str)
          readBooks(function (books) {
            book.id=books.length?books[books.length-1].id+1:1
            books.push(book)
            writeBooks(books,function () {
              res.end(JSON.stringify(book))
            })
          })
        })
        break;
      case 'PUT': //修改图书信息
        var str=''
        req.on('data',function (data) {
          str+=data
        })
        req.on('end',function (data) {
          var book=JSON.parse(str)
          readBooks(function (books) {
            books=books.map((item)=>{//匹配到id后，替换掉那一项
              if(item.id==id){
                 return book
              }
              return item
            })
            writeBooks(books,function () {
              res.end(JSON.stringify(book))
            })
          })
        })

        break;
      case 'DELETE':
        readBooks(function (books) {
          books=books.filter(item=>item.id!=id)
          writeBooks(books,function () {
            res.end(JSON.stringify({}))
          })
        })
        break;
    }

  }else {
    res.statusCode=404
    res.end()
  }
}).listen(4000)
//readBooks(data,function () {})这里的data其实就是读'./books.json'文件，读到的内容
