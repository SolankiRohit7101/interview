import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [inputData, setInputData] = useState({});
  const [toggle, setToggle] = useState("email");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4999/api/user/login",
          {
            ...inputData,
            toggleLogin: toggle,
          },
          { withCredentials: true }
        )
        .then(({ data }) => {
          localStorage.setItem("currentUser", JSON.stringify(data.userData));
          if (data.success === true) navigate("/dashboard");
        });
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }
  };

  return (
    <div className=" w-full  mb-10 min-h-screen  mx-auto">
      <div className=" h-full  w-2/4  m-auto  flex justify-center items-center flex-col gap-5">
        <h1 className="text-white  font-bold text-4xl pb-6">Login</h1>
        <div className="w-full flex justify-center items-center  flex-col gap-5">
          <div className="w-full rounded  bg-white flex justify-center items-center">
            <button
              className={`w-full ${toggle === "email" && "bg-blue-700"} `}
              onClick={() => setToggle("email")}
            >
              Email
            </button>
            <button
              className={`w-full ${toggle === "phoneNo" && "bg-blue-700"} `}
              onClick={() => setToggle("phoneNo")}
            >
              Phone
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <input
              type={toggle === "email" ? "email" : "number"}
              name={toggle === "email" ? "email" : "phoneNo"}
              id="email"
              placeholder={
                toggle === "email" ? "enter email" : "enter phone number"
              }
              required
              className=" bg-white px-4 py-2 rounded  hover:bg-opacity-75 w-full"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter password"
              required
              className=" bg-white px-4 py-2 rounded  hover:bg-opacity-75 w-full"
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSubmit} className="w-full bg-blue-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
