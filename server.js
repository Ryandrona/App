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
  con.query("SELECT * FROM `danhmucsanpham` order by madanhmucsanpham desc", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});
//Thêm danh mục sản phẩm
app.post('/adddanhmucsanpham', function (req, res) {
  // console.log(req.body);
  //lệnh SQL
  var sql = "insert into danhmucsanpham (tendanhmucsanpham , idcha) values ('"+req.body.name_category+"' , '"+req.body.name_category_parent+"')";
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
app.post('/editdanhmucsanpham/editid', function(req, res){
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
//Sửa chi tiết Danh Mục sản phẩm lấy theo ID 
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
  con.query("SELECT * FROM `thuonghieu` order by mathuonghieu desc", function (err, result, fields) {
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
//Sửa Thương Hiệu
app.post('/editthuonghieu/editid', function(req, res){
  console.log("Vào server thành công")
  var sql = "UPDATE thuonghieu SET tenthuonghieu = ('"+req.body.name_trademark+"'), email =('"+req.body.name_trademark_email+"'), diachi =('"+req.body.name_trademark_address+"')  where mathuonghieu = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Chỉnh sửa chi tiết thương hiệu lấy theo ID
app.get('/editthuonghieu/:idsp', function (req, res) {
  var page = req.params.idsp;
  
  var sql = "SELECT * FROM thuonghieu WHERE mathuonghieu = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
    });
});



//hiển thị Sản Phẩm
app.get('/sanpham', function (req, res) {
  con.query("SELECT * FROM `sanpham`order by masanpham desc", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});
//Thêm Sản Phẩm
app.post('/addsanpham', function (req, res) {
  // console.log(req.body);
  //lệnh SQL
  var sql = "insert into sanpham (tensanpham , loaisanpham , giasanpham , chitietsanpham , hangsanxuat , mahinhanh , thuonghieu ,manhinh , cpu , ram , ocung , trongluong , ngaysanxuat)  values ('"+req.body.name_product+"' , '"+req.body.name_category+"' , '"+req.body.product_price+"', '"+req.body.details+"', '"+req.body.manufacturer+"', '"+req.body.image+"', '"+req.body.trademark+"', '"+req.body.screen+"', '"+req.body.cpu+"','"+req.body.ram+"', '"+req.body.hard_drive+"', '"+req.body.weight+"', '"+req.body.date+"')";
      console.log(sql);
      con.query(sql , function(err, result, fields){
        if(err) throw err;
        // console.log(result);
        if(result.affectedRows == 1){
          res.send('ok');
        }
      });
});
//Xóa Sản Phẩm
app.post('/deletesanpham', function(req, res){
  // console.log("abc")
  var sql = "delete from sanpham where masanpham = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})
//Search Sản Phẩm
app.get('/search/:nameproduct',function(req, res){
  var ten = req.params.nameproduct
  con.query("SELECT * FROM sanpham where tensanpham = '"+ ten +"' or giasanpham = '"+ ten +"' or loaisanpham = '"+ ten +"' or hangsanxuat = '"+ ten +"' or masanpham = '"+ ten +"' ", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
  
});
//Sửa Sản Phẩm
app.post('/editsanpham/editid', function(req, res){
  console.log("Vào server thành công")
  var sql = "UPDATE sanpham SET tensanpham = ('"+req.body.name_trademark+"'), loaisanpham =('"+req.body.name_trademark_email+"'), giasanpham =('"+req.body.name_trademark_address+"'), chitietsanpham =('"+req.body.details+"'), hangsanxuat =('"+req.body.manufacturer+"'), mahinhanh =('"+req.body.image+"'), thuonghieu =('"+req.body.trademark+"'), manhinh =('"+req.body.screen+"'), cpu =('"+req.body.cpu+"'), ram =('"+req.body.ram+"'), ocung =('"+req.body.hard_drive+"'), trongluong =('"+req.body.weight+"'), ngaysanxuat =('"+req.body.date+"')  where masanpham = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Chỉnh sửa chi tiết Sản Phẩm lấy theo ID
app.get('/editsanpham/:idsp', function (req, res) {
  var page = req.params.idsp;
  
  var sql = "SELECT * FROM sanpham WHERE masanpham = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

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


