import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_API_URL } from "../constants";

function CreateDevices() {

  const navigate = useNavigate();

  const [categories, setCategoris] = useState([]);

  const [devices, setDevices] = useState({
    name: '',
    price: '',
    description: '',
    countInStock: '',
    imageUrl: '',
    category: '',

  })
  useEffect(() => {
    axios.get(`${BASE_API_URL}/categories`).then((response) => {
      setCategoris(response.data)
    })
  }, [])

  const HandleInput = (e) => {
    // debugger
    e.persist();
    console.log(e.target.name)
    setDevices({ ...devices, [e.target.name]: e.target.value });

  }

  const SaveDevices = (e) => {
    e.preventDefault();

    axios.post(`${BASE_API_URL}/products`, devices).then(res => {

      alert(res.data);
      navigate('/Devices');

    });
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4> Add Devices
                <Link to="/devices" className="btn btn-danger float-end">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={SaveDevices}>
                <div className="mb-3" >
                  <label>Name</label>
                  <input type="text" name="name" onChange={HandleInput} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Price</label>
                  <input type="text" name="price" onChange={HandleInput} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <input type="text" name="description" onChange={HandleInput} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Count</label>
                  <input type="number" name="countInStock" onChange={HandleInput} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Image</label>
                  <input type="url" name="imageUrl" onChange={HandleInput} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Category</label>
                  <select name="category" onChange={HandleInput} className="form-select" aria-label="Default select example" required>
                    <option value="">Select Category</option>

                    {categories.map(category => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary mt-5">Save Devices</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}
export default CreateDevices