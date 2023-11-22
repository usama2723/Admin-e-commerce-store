import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { BASE_API_URL } from "../constants";

function EditDevices() {
  let { id } = useParams();

  const [devices, setDevices] = useState({})
  const [categories, setCategoris] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_API_URL}/categories`).then((response) => {
      setCategoris(response.data) 
    })
    axios.get(`${BASE_API_URL}/products/${id}`).then((response) => {
      setDevices(response.data)
    })
  }, [id])

  const HandleInput = (e) => {
    e.persist();
    setDevices({ ...devices, [e.target.name]: e.target.value });
  }

  const updateDevices = (e) => {
    e.preventDefault();
    const data = {
      name: devices.name,
      price: devices.price,
      description: devices.description,
      countInStock: devices.countInStock,
      imageUrl: devices.imageUrl,
      category: devices.category,
    }
    axios.put(`${BASE_API_URL}/products/${id}`, data).then(response => {

      alert(response.data);
    });
  }
  console.log({ devices })

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4> Edit Devices
                <Link to="/devices" className="btn btn-danger float-end">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={updateDevices}>
                <div className="mb-3" >
                  <label>Name</label>
                  <input type="text" name="name" onChange={HandleInput}
                value={devices.name} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Price</label>
                  <input type="number" name="price" onChange={HandleInput} value={devices.price} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <input type="text" name="description" onChange={HandleInput} value={devices.description} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Count</label>
                  <input type="number" name="countInStock" onChange={HandleInput} value={devices.countInStock} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Image</label>
                  <input type="url" name="imageUrl" onChange={HandleInput} value={devices.imageUrl} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Category</label>
                  <select name="category" onChange={HandleInput} className="form-select" aria-label="Default select example">
                    {categories.map(category => (
                      <option key={category._id}  value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">Update Devices</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>

  )

}
export default EditDevices