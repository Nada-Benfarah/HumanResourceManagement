import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: null,
    image: "",
  });
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", employee.name);
    form.append("email", employee.email);
    form.append("password", employee.password);
    form.append("salary", employee.salary);
    form.append("address", employee.address);
    form.append("category_id", employee.category_id);
    form.append("image", employee.image);
    axios
      .post("http://localhost:3000/auth/add_employee", form)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border ">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              id="inputName"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              id="inputEmail"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id="inputPassword"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              placeholder="Enter Salary"
              id="inputSalary"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputAdress" className="form-label">
              Address
            </label>
            <input
              type="text"
              placeholder="1234 Main St"
              id="inputAdress"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              defaultValue={null}
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              <option value={null}>Choose category</option>
              {categories &&
                categories.map((category) => {
                  return <option value={category.id}> {category.name}</option>;
                })}
            </select>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              placeholder="Enter Email"
              id="inputGroupFile01"
              className="form-control rounded-0"
              autoComplete="off"
              accept="image/*"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
