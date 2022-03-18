import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
 
const EditEmployee = () => {
  const api ='http://localhost:3001/';
  let history = useHistory(); //hàm history.
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 
 
  //Tạo useState id cha và tên
  const [trademarkname ,settrademarkname] = useState({
    name_trademark:"",
    name_trademark_email:"",
    name_trademark_address:"",
    details:"",
    manufacturer:"",
    image:"",
    trademark:"",
    screen:"",
    cpu:"",
    ram:"",
    hard_drive:"",
    weight:"",
    date:"",
  })
  const onInputChange = e => {
    settrademarkname({ ...trademarkname,[e.target.name]: e.target.value });
  };
  const { name_trademark, name_trademark_email, name_trademark_address, details, manufacturer, image, trademark,screen, cpu, ram, hard_drive, weight, date } = trademarkname;


  useEffect(() => {
    getthuonghieu();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editsanpham/editid', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: id,
          name_trademark: name_trademark ,
          name_trademark_email:  name_trademark_email,
          name_trademark_address: name_trademark_address,
          details:details,
          manufacturer:manufacturer,
          image:image,
          trademark:trademark,
          screen:screen,
          cpu:cpu,
          ram:ram,
          hard_drive:hard_drive,
          weight:weight,
          date:date,
        })
        
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("xóa thành công")
      }
    });
    console.log("tên đã nhập : " + name_trademark);
    history.push("/home");
  };
 
  // code hiển thị id danh mục
  const getthuonghieu =  async() => {
    console.log(id);

            const base_url = api + `editsanpham/${id}`;
            const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
            console.log(response.data); 
            // setcategory(response.data);  // hiển thị
            console.log(response.data[0].tensanpham);
            settrademarkname({
                    update: true,
                    name_trademark:response.data[0].tensanpham,
                    name_trademark_email:response.data[0].loaisanpham,
                    name_trademark_address:response.data[0].giasanpham,
                    details:response.data[0].chitietsanpham,
                    manufacturer:response.data[0].hangsanxuat,
                    image:response.data[0].mahinhanh,
                    trademark:response.data[0].thuonghieu,
                    screen:response.data[0].manhinh,
                    cpu:response.data[0].cpu,
                    ram:response.data[0].ram,
                    hard_drive:response.data[0].ocung,
                    weight:response.data[0].trongluong,
                    date:response.data[0].ngaysanxuat,
                  })
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
              placeholder="Nhập Tên Sản Phẩm"
              name="name_trademark"
              value={name_trademark}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
        
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Loại Sản Phẩm"
              name="name_trademark_email"
              value={name_trademark_email}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập Giá Sản Phẩm"
              name="name_trademark_address"
              value={name_trademark_address}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Thông Tin Chi Tiết"
              name="details"
              value={details}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Hệ Điều Hành"
              name="manufacturer"
              value={manufacturer}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Mã hình ảnh (sau này update thêm)"
              name="image"
              value={image}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Thương Hiệu"
              name="trademark"
              value={trademark}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Màn Hình"
              name="screen"
              value={screen}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập CPU"
              name="cpu"
              value={cpu}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập RAM"
              name="ram"
              value={ram}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Ổ Cứng"
              name="hard_drive"
              value={hard_drive}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Trọng Lượng Của Máy"
              name="weight"
              value={weight}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Ngày Sản Xuất"
              name="date"
              value={date}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditEmployee;