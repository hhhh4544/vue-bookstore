let http=require('http')
let fs=require('fs')
let url=require('url')
function readBooks(callback) {
  fs.readFile('./books.json','utf8',function (err,data) {
    if(err||data.length==0)data='[]'
    callback(JSON.parse(data))
  })
}
function writeBooks(data,callback) {
  fs.writeFile('./books.json',JSON.stringify(data),callback)
}
http.createServer(function (req,res) {
  let {pathname,query}=url.parse(req.url,true)
  if(pathname=='/book'){
    let id=query.id
    switch (req.method){
      case 'GET':
        if(id){
          readBooks(function (data) {
            var book=data.find((item)=>{
              return item.id==id
            })
            res.end(JSON.stringify(book))
          })
        }else {
          readBooks(function (data) {
            res.end(JSON.stringify(data))
          })
        }
        break;
      case 'PUT':
        var str=''
        req.on('data',function (data) {
          str+=data
        })
        req.on('end',function (data) {
          var book=JSON.parse(str)
          readBooks(function (data) {
            data=data.map((item)=>{
              if(item.id==id){
                return book
              }
              return item
            })
            writeBooks(data,function () {
              res.end(JSON.stringify(book))
            })
          })
        })

        break;
      case 'DELETE':
        readBooks(function (data) {
          data=data.filter((item)=>{
            return item.id!=id
          })
          writeBooks(data,function () {
            res.end(JSON.stringify({}))
          })
        })
        break;
      case 'POST':
        var str=''
        req.on('data',function (data) {
          str+=data
        })
        req.on('end',function (data) {
          var book=JSON.parse(str)
          readBooks(function (data) {
            book.id=data.length?data[data.length-1].id+1:1
            data.push(book)
            writeBooks(data,function () {
              res.end(JSON.stringify(book))})
          })
        })
        break;
    }
  }else{
    res.statusCode=404
    res.end()
  }
}).listen(4000)
