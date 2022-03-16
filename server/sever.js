// const port = 3000
var express = require("express");
var app = express();
var mysql = require("mysql");
var fs = require("fs");
var cors = require("cors");
//sql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "appreactnative",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// đây là cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express
app.use(express.static("public"));

// Trang chủ
app.get("/", function (req, res) {
  res.send("Giao Diện!");
});

//Trang Sản phẩm
app.get("/sanpham", function (req, res) {
  con.query("SELECT * FROM `sanpham`", function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
  });
});
// Trang thuowng hieeu
app.get("/thuonghieu", function (req, res) {
  con.query("SELECT * FROM `thuonghieu`", function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
  });
});

// Phân Trang Sản Phẩm
app.get("/sanpham/:masanpham", function (req, res) {
  var page = req.params.masanpham;

  var limit = 1;
  var offset = (page - 1) * limit;
  var sql =
    "SELECT * FROM sanpham order by masanpham desc  limit " +
    offset +
    ", " +
    limit;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
  });
});

//hiển thị danh mục sản phẩm
app.get("/danhmucsanpham", function (req, res) {
  con.query("SELECT * FROM `danhmucsanpham`", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
  });
});

//Thêm danh mục sản phẩm
app.post("/danhmucsanpham", function (req, res) {
  // console.log(req.body);
  //lệnh SQL
  var sql =
    "insert into danhmucsanpham (tendanhmucsanpham , idcha)  values ('" +
    req.body.name_category +
    "' , '" +
    req.body.name_category_parent +
    "')";
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    if (result.affectedRows == 1) {
      res.send("ok");
    }
  });
});

//hiển thị thương hiệu sản phẩm
// app.get("/thuonghieu", function (req, res) {
//   con.query("SELECT * FROM `thuonghieu`", function (err, result, fields) {
//     // console.log(result);
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get("/thuonghieu/:id", (req, res) => {
//   var pro = req.params.id;
//   console.log(pro);
//   var sql = "SELECT * FROM thuonghieu WHERE mathuonghieu = " + pro;
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// thêm thuong hiệu

// app.post("/addthuonghieu", function (req, res) {
//   // console.log(req.body);
//   //lệnh SQL
//   var sql =
//     "insert into thuonghieu (tenthuonghieu, email,diachi)  values ('" +
//     req.body.name_trademark +
//     "' , '" +
//     req.body.email_trademark +
//     "','" +
//     req.body.diachi_trademark +
//     "')";
//   console.log(sql);
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     // console.log(result);
//     if (result.affectedRows == 1) {
//       res.send("ok");
//     }
//   });
// });

// update

// app.put("/suathuonghieu", (req, res) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   const name = req.body.name;
//   db.query(
//     "UPDATE thuonghieu SET tenthuonghieu = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.post("/deletethuonghieu/:id", (req, res) => {
//   const id = req.params.id;
//   con.query(
//     "DELETE FROM thuonghieu WHERE mathuonghieu = ?",
//     id,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// xóa

// app.post("/deletethuonghieu/:id", (req, res) => {
//   // const id = req.params.id;
//   db.query("DELETE FROM thuonghieu WHERE mathuonghieu = ?", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.listen(3001, () => {
//   console.log("Yey, your server is running on port 3001");
// });

//Trang home
// app.get('/home', function (req, res) {
//     fs.readFile('BaiTesst.html', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       return res.end();
//     });
// });

//thêm
// app.post('/addproduct', function (req, res) {
//   // console.log(req.body);

//   //lệnh SQL
//   var sql = "insert into product (ten , loai)  values ('"+req.body.myten+"' , '"+req.body.myloai+"')";
//   // console.log(sql);

//       con.query(sql , function(err, result, fields){
//         if(err) throw err;
//         if(result =='ok'){
//           result.send('ok');
//         }
//       });

// })

//XÓa
// app.post('/deleteproduct', function(req, res){
//   var sql = "delete from product where id =("+req.body.myid+")";
//   // console.log(sql);
//   con.query(sql, function(err, result, fields){
//     if(err) throw err;
//     if(result =='okdelete'){
//       result.send('okdelete');
//     }
//   });
// })

// //Sửa
// app.post('/editproduct', function(req, res){
//   var sql = "UPDATE product SET ten = ('"+req.body.editten+"') , loai = ('"+req.body.editloai+"') where id = ("+req.body.editid+")";
//   // console.log(sql);
//   con.query(sql, function(err, result, fields){
//     if(err) throw err;
//     if(result =='okedit'){
//       result.send('okedit');
//     }
//   });
// })

// card -------------------------------------

// app.post("/addthuonghieu", (req, res) => {
//   const tenthuonghieu = req.body.tenthuonghieu;
//   const email = req.body.email;
//   const diachi = req.body.diachi;

//   con.query(
//     "INSERT INTO thuonghieu (tenthuonghieu, email, diachi) VALUES (?,?,?)",
//     [tenthuonghieu, email, diachi],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("xong");
//       }
//     }
//   );
// });

// app.get("/thuonghieu", (req, res) => {
//   con.query("SELECT * FROM thuonghieu", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// // sửa
// app.put("/updatethuonghieu", (req, res) => {
//   const mathuonghieu = req.body.mathuonghieu;
//   const tenthuonghieu = req.body.tenthuonghieu;
//   const email = req.body.email;
//   const diachi = req.body.diachi;

//   con.query(
//     "UPDATE thuonghieu SET tenthuonghieu = ?, email = ?, diachi = ? WHERE mathuonghieu = ?",
//     [tenthuonghieu, email, diachi, mathuonghieu],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// // xóa

// app.delete("/deletethuonghieu/:id", (req, res) => {
//   const id = req.params.id;
//   con.query(
//     "DELETE FROM thuonghieu WHERE mathuonghieu = ?",
//     id,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// ERR 404
app.use(function (req, res, next) {
  res.status(404);
  res.send("404: err");
});

//server
app.listen(3002, function () {
  console.log('Example app listening on port 3001! "http://localhost:3002"  ');
});
