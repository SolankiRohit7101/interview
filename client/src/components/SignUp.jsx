import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inputData, setInputData] = useState({});
  const [hobby, setHobby] = useState("");
  const [hobbies, setHobbies] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      console.log("testing");
    } else if (e.target.type === "radio") {
      setInputData({ ...inputData, gender: e.target.id });
    } else {
      setInputData({ ...inputData, [name]: value });
    }
  };

  const handleAddHobbies = () => {
    setHobbies([...hobbies, hobby]);
    setHobby("");
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:4999/api/user/register", {
          ...inputData,
          hobbies,
        })
        .then(({ data }) => {
          if (data.success === true) navigate("/login");
        });
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }
  };

  return (
    <div className=" w-full  mb-10 min-h-screen  mx-auto">
      <div className=" h-full  w-2/4  m-auto  flex justify-center items-center flex-col gap-5">
        <h1 className="text-white  font-bold text-4xl pb-6">Signup</h1>
        <div className="w-full flex justify-center items-center  flex-col gap-5">
          <div className="w-full flex justify-center items-center">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="enter name"
              required
              className=" bg-white px-4 py-2 rounded  w-full hover:bg-opacity-75"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="enter email"
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
          <div className="w-full flex justify-center items-center">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="enter confirm password"
              required
              className=" bg-white px-4 py-2 rounded  hover:bg-opacity-75 w-full"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <input
              type="number"
              name="phoneNo"
              id="phoneNo"
              placeholder="enter phone number"
              required
              className=" bg-white px-4 py-2 rounded  hover:bg-opacity-75 w-full"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center bg-white py-2 rounded px-4 gap-3">
            <>
              <input
                type="radio"
                name="gender"
                id="female"
                className=" bg-white px-4 py-2 rounded  hover:bg-opacity-75 "
                defaultChecked={true}
                onChange={handleChange}
              />
              <label htmlFor="female" name="female">
                female
              </label>
            </>
            <>
              <input
                type="radio"
                onChange={handleChange}
                htmlFor="male"
                name="gender"
                id="male"
                className=" bg-white px-4 py-2 rounded  hover:bg-opacity-75 "
              />
              <label htmlFor="male" name="male">
                male
              </label>
            </>
          </div>
          <div className="w-full flex justify-center items-center flex-col ">
            <div
              className="bg-white 
             py-2 w-full overflow-scroll px-5 flex-wrap flex gap-5  "
            >
              {!hobbies ? (
                <p>Please eneter your hobbies</p>
              ) : (
                hobbies.map((item, i) => (
                  <div
                    key={i}
                    className=" flex justify-between gap-2 border bg-zinc-400 px-2"
                  >
                    <i key={i}>{item}</i>
                    <button
                      onClick={() => {
                        const filterHobbies = hobbies.filter(
                          (item) => item !== hobbies[i]
                        );
                        setHobbies([...filterHobbies]);
                      }}
                      className=" w-full text-white bg-red-700"
                    >
                      X
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-center items-center w-full">
              <input
                type="text"
                name="hobby"
                id="hobby"
                value={hobby}
                placeholder="enter your hobby"
                required
                className=" bg-white px-4 py-2 rounded-bl hover:bg-opacity-75 w-full"
                onChange={(e) => setHobby(e.target.value)}
              />
              <button
                className="bg-white w-full border-l h-full"
                onClick={handleAddHobbies}
              >
                Add
              </button>
            </div>
          </div>
          <div className="bg-white w-full ">
            <h3>address</h3>
            <div>
              <input
                type="text"
                name="city"
                placeholder="city"
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="state"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="country"
                name="country"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <input
              type="date"
              name="dob"
              id="dob"
              placeholder="enter date of birth"
              required
              className=" bg-white px-4 py-2 rounded  w-full hover:bg-opacity-75"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <input
              type="file"
              name="profleImage"
              id="profleImage"
              className=" bg-white px-4 py-2 rounded  w-full hover:bg-opacity-75"
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

export default SignUp;
