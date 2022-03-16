// const port = 3000
var express = require('express');
var app = express();
var mysql = require('mysql');
var fs = require('fs');
var cors = require('cors');
//sql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'du_an_react_native'
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// đây là cors 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// express
app.use(express.static('public'));

// Trang chủ
app.get('/', function (req, res) {
    res.send('Giao Diện!');
});


// // Phân Trang Sản Phẩm
// app.get('/sanpham/:masanpham', function (req, res) {
//   var page = req.params.masanpham;
  
//   var limit = 1;
//   var offset = (page -1)*limit;
//   var sql = "SELECT * FROM sanpham order by masanpham desc  limit "+ offset + ", " + limit ;
//   con.query(sql , function (err, result, fields) {
//     if (err) throw err;
//     // console.log(result);
     
//     res.send(result);
//     });
// });

// // chi tiết sp
// app.get('/product/:id/:idsp', function (req, res) {
//   var page = req.params.idsp;
  
//   var sql = "SELECT * FROM product WHERE id = " + page;
//   con.query(sql , function (err, result, fields) {
//     if (err) throw err;
//     // console.log(result);

//     res.send(result);
//     });
// });


//hiển thị danh mục sản phẩm
app.get('/danhmucsanpham', function (req, res) {
  con.query("SELECT * FROM `danhmucsanpham`", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});
//Thêm danh mục sản phẩm
app.post('/adddanhmucsanpham', function (req, res) {
  // console.log(req.body);
  //lệnh SQL
  var sql = "insert into danhmucsanpham (tendanhmucsanpham , idcha)  values ('"+req.body.name_category+"' , '"+req.body.name_category_parent+"')";
  console.log(sql);
      con.query(sql , function(err, result, fields){
        if(err) throw err;
        // console.log(result);
        if(result.affectedRows == 1){
          res.send('ok');
        }
      });
})
//Xóa danh mục Sản Phẩm
app.post('/deletedanhmucsanpham', function(req, res){
  // console.log("abc")
  var sql = "delete from danhmucsanpham where madanhmucsanpham = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})
//Sửa danh mục Sản Phẩm
app.post('/editdanhmucsanphamabc', function(req, res){
  console.log("Vào server thành công")
  var sql = "UPDATE danhmucsanpham SET tendanhmucsanpham = ('"+req.body.name_category+"'), idcha =('"+req.body.name_category_parent+"')  where madanhmucsanpham = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Sửa chi tiết sản phẩm lấy theo ID 
app.get('/editdanhmucsanpham/:idsp', function (req, res) {
  var page = req.params.idsp;
  
  var sql = "SELECT * FROM danhmucsanpham WHERE madanhmucsanpham = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
    });
});


//hiển thị Thương Hiệu
app.get('/thuonghieu', function (req, res) {
  con.query("SELECT * FROM `thuonghieu`", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});
//Thêm thương hiệu
app.post('/addthuonghieu', function (req, res) {
  // console.log(req.body);
  //lệnh SQL
  var sql = "insert into thuonghieu (tenthuonghieu , email , diachi)  values ('"+req.body.name_trademark+"' , '"+req.body.email_trademark+"' , '"+req.body.address_trademark+"')";
  console.log(sql);
      con.query(sql , function(err, result, fields){
        if(err) throw err;
        // console.log(result);
        if(result.affectedRows == 1){
          res.send('ok');
        }
      });
})
//Xóa thương hiệu
app.post('/deletethuonghieu', function(req, res){
  // console.log("abc")
  var sql = "delete from thuonghieu where mathuonghieu = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})



//hiển thị Sản Phẩm
app.get('/sanpham', function (req, res) {
  con.query("SELECT * FROM `sanpham`", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});


// ERR 404
app.use(function(req, res, next) {
    res.status(404);
    res.send('404: err');
});

//server
app.listen(3001, function () {
    console.log('Example app listening on port 3001! "http://localhost:3001"  ');
});


