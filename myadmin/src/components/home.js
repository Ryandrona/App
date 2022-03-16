import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import axios from "axios";

 
function EmployeeDetail()
{
  const [search,setSearch] =useState('');
  const [record,setRecord] = useState([]);
 
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    salary: ""
  });
  
    //  Object Destructuring 
    const { fname, lname, email,phone,salary} = user;
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
     
    // On Page load display all records 
    const loadEmployeeDetail = async () =>  
    {
      var response = fetch('http://localhost:3001/sanpham')
         .then(function(response){
            return response.json();
          })
         .then(function(myJson) {
            setRecord(myJson);
          });
    }
    useEffect(() => {
      loadEmployeeDetail();
    }, []);
 
    // Insert Employee Records 
    const submitEmployeeRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post("http://localhost:5000/api/v1/employee",user);
        alert('Data Inserted');
         
        loadEmployeeDetail();
    };
     
    // Search Records here 
    const searchRecords = () =>
    {
        alert(search)
        axios.get(`http://localhost:5000/api/v1/employee/searchRecord/${search}`)
        .then(response => {
          setRecord(response.data);
        });
    }
     
    // Delete Employee Record
    const deleteRecord = (productId) =>
    {
      axios.delete(`http://localhost:5000/api/v1/employee/${productId}`)
      .then((result)=>{
        loadEmployeeDetail();
      })
      .catch(()=>{
        alert('Error in the Code');
      });
    };
 
  return(
    <section>    
   
    <div className="container">  
    <h4 className="mb-3 text-center mt-4">THÊM XÓA SỬA SẢN PHẨM</h4>
      <div className="row mt-3">
       <div className="col-sm-4">
          <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
            <form onSubmit={submitEmployeeRecord}> 
            <h5 className="mb-3 ">Thêm Sản Phẩm</h5>
                <div className="form-group">
                   <input type="text" className="form-control  mb-4" name="fname"   value={fname} onChange={e => onInputChange(e)} placeholder="Tên Sản Phẩm" required=""/>
                </div>
                  
                <div className="form-group">
                   <input type="text" className="form-control  mb-4" name="lname" value={lname} onChange={e => onInputChange(e)}  placeholder="Loại Sản Phẩm" required=""/>
                </div>
     
                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="email" value={email} onChange={e => onInputChange(e)}  placeholder="Giá Sản Phẩm" required=""/>
                </div>
               
                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="phone" value={phone} onChange={e => onInputChange(e)}  placeholder="Chi Tiết Sản Phẩm" required=""/>
                </div>
 
                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="Hãng Sản Xuất" required=""/>
                </div>

                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="ID hình ảnh" required=""/>
                </div>

                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="Thương Hiệu" required=""/>
                </div>

                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="Màn Hình" required=""/>
                </div>

                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="CPU" required=""/>
                </div>

                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="RAM" required=""/>
                </div>

                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="Ổ Cứng" required=""/>
                </div>

                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="Trọng Lượng" required=""/>
                </div>

                <div className="form-group">
                   <input type="text" className="form-control mb-2" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="Ngày Sản Xuất" required=""/>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-4">Add</button>
             </form>
        </div>
      </div>
      <div className="col-sm-8">
        <h5 className="text-center  ml-4 mt-4  mb-5">View Records</h5>
        <div className="input-group mb-4 mt-3">
          <div className="form-outline">
           <input type="text" id="form1" onChange={(e)=>setSearch(e.target.value)} className="form-control" placeholder="Search Employee Here" style={{backgroundColor:"#ececec"}}/>
        </div>
        <button type="button" onClick={searchRecords}  className="btn btn-success">
            <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        </div>  
        <table className="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>ID Sản Phẩm</th>
                <th>Tên Sản Phẩm</th>
                <th>Loại Sản Phẩm</th>
                <th>Giá Sản Phẩm</th>
                <th>Hãng Sản Xuất</th>  
            </tr>
            </thead>
            <tbody>
     
            {record.map((name)=>
                <tr key={name.masanpham}>
                <td>{name.masanpham}</td>
                <td>{name.tensanpham}</td>
                <td>{name.loaisanpham}</td>
                <td>{name.giasanpham}</td>
                <td>{name.hangsanxuat}</td>
                <td>
                      {/* <a  className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete "+ name.first_name
                          )
                          if (confirmBox === true) {
                            deleteRecord(name.id)
                          }
                        }}> <i className="far fa-trash-alt" style={{fontSize:"18px",marginRight:"5px"}}></i> </a>
                   
                    <Link className=" mr-2" to={`/EditEmployee/editID/${name.id}`}>
                       <i class="fa fa-edit" aria-hidden="true"></i> 
                    </Link> */}

                        <button className="magin_btn" 
                          onClick={() => { 
                          const confirmBox = window.confirm(
                            "Bạn chắc chắn muốn xóa Tên Danh Mục : "+ name.tensanpham +""
                          )
                          if (confirmBox === true) {
                            // delete_category(item.madanhmucsanpham)     
                            deleteRecord(name.id)                   
                          }
                          
                        }}>   Xóa    </button>

                        <button className="magin_btn">
                          Sửa
                         
                        </button>
                </td>
                </tr>
                )} 
            </tbody>
        </table>
      </div>
      </div>
    </div>
   </section>
  )
}
 
export default EmployeeDetail;
