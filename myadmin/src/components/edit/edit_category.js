import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
// import axios from "axios";
 
const EditEmployee = () => {
  const api ='http://localhost:3001/';
  let history = useHistory(); //hàm history.
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 
  
 
  //tạo usestate cho tên và id cha
  const [category ,setcategory] = useState({
    name_category:"",
    name_category_parent: "",
  })
 
 
  const { name_category, name_category_parent } = category;
 
  const onInputChange = e => {
    setcategory({ ...category,[e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    getdanhmuc();
  }, []);
 
  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editdanhmucsanphamabc/', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: id,
          name_category: name_category ,
          name_category_parent:  name_category_parent,
        })
        
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("xóa thành công")
      }
    });
    console.log("tên đã nhập : " + name_category);
    console.log("ID cha đã nhập : " + name_category_parent);
    history.push("/category");
  };
 
  // code hiển thị id danh mục
  const getdanhmuc =  async() => {
    console.log(id);
      fetch(api + `editdanhmucsanpham/${id}`,{
            method: "GET",
          })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setcategory({
                    madanhmucsanpham: id,
                    update: true,
                    name_category: result.response[0].tendanhmucsanpham,
                    name_category_parent: result.response[0].idcha,
                });
            })
            .catch((error) => console.log("error", error));

            // const base_url = api + `editdanhmucsanpham/${id}`;
            // const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
            // // console.log(response.data); 
            // setcategory(response);  // hiển thị
  };
 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">Cập Nhật Thông Tin</h4>
       
          <h5 className="text-success">ID Danh Mục: {id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Tên Danh Mục"
              name="name_category"
              value={name_category}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập ID Cha"
              name="name_category_parent"
              value={name_category_parent}
              onChange={e => onInputChange(e)}
            />
          </div>
          
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditEmployee;