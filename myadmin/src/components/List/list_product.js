import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
 
function RecordsFetch() {
    const [users, setUsers] = useState([]);
     
    
    const getUsers = async () => { 
      const result = await axios.get("http://localhost:3001/sanpham");
    //   setUsers(result.data.reverse());
        setUsers(result.data);
        console.log(result.data);
     } 
 
    useEffect(() => {
      getUsers();
    }, []);
     
    return (
         <div className="container">
           <h3 className="text-center text-success mb-5 mt-4">Danh Sách Sản Phẩm</h3>
            <div className="row">
                  <table className="table table-striped">
                      <thead>
                        <tr>
                        <th>ID</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Loại Sản Phẩm</th>
                        <th>Giá Sản Phẩm</th>
                        <th>Chi Tiết Sản Phẩm</th>
                        <th>Hệ Điều Hành</th>
                        <th>Hình Ảnh</th>
                        <th>Thương Hiệu</th>
                        <th>Màn Hình</th>
                        <th>CPU</th>
                        <th>RAM</th>
                        <th>Ổ Cứng</th>
                        <th>Trọng Lượng</th>
                        <th>Ngày Sản Xuất</th>
                        </tr>
                      </thead>
                        {
                          users.map((res) => {
                           return (
                        <tbody key={res.masanpham}>
                          <tr key={res.masanpham}>
                            <td>{res.masanpham}</td>
                            <td>{res.tensanpham}</td>
                            <td>{res.loaisanpham}</td>
                            <td>{res.giasanpham.toLocaleString()}</td>
                            <td>{res.chitietsanpham}</td>
                            <td>{res.hangsanxuat}</td>
                            <td>{res.mahinhanh}</td>
                            <td>{res.thuonghieu}</td>
                            <td>{res.manhinh}</td>
                            <td>{res.cpu}</td>
                            <td>{res.ram}</td>
                            <td>{res.ocung}</td>
                            <td>{res.trongluong}</td>
                            <td>{res.ngaysanxuat}</td>
                          </tr>   
                        </tbody> 
                              )
                            })
                         }  
                </table>    
            </div>    
         </div>
    );
  }
 
export default RecordsFetch;