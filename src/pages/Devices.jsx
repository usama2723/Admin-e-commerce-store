import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import 'bootstrap'
import axios from "axios"
import { BASE_API_URL } from "../constants"

const Devices = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_API_URL}/products`).then(res => {
      console.log(res);
      setDevices(res.data);
    });
  }, [])

  const DeleteDevice = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";
    axios.delete(`http://localhost:3000/api/products/${id}`).then(res => {
      console.log(res);
  
      thisClicked.closest("tr").remove();
    });
  }
  const DevicesDetail = devices.map((item, index) => {

    return (
      <tr key={index}>
        <td>{index +1}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.description}</td>
        <td>{item.countInStock}</td>
        <td>
          <img className="w-100" src={item.imageUrl} />
        </td>
      
        <td>
          <Link to={`/d/${item._id}/edit-devices`} className="btn btn-success">Edit</Link>
        </td>
        <td>
          <button type="button" onClick={(e) => DeleteDevice(e, item._id)} className="btn btn-danger">Delete</button>
        </td>

      </tr>
    )

  });
  console.log({ DevicesDetail });
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Devices List
                <Link to="/create-devices" className="btn btn-primary float-end">
                  Add Devices
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Count</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {DevicesDetail}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Devices