import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./Components/Employee";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Category from "./Components/Category";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="adminlogin" element={<Login />}></Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Home />}></Route>
          <Route path="employee" element={<Employee />}></Route>
          <Route path="category" element={<Category />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="add_category" element={<AddCategory />}></Route>
          <Route path="add_employee" element={<AddEmployee />}></Route>
          <Route path="edit_employee/:id" element={<EditEmployee />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
