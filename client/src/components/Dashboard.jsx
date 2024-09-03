import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center flex-col gap-5 text-white items-center">
      <div className="flex justify-center items-center  w-full h-full text-white">
        <div>
          <b>name</b> : {userData.name} <br />
          <b>email</b> : {userData.email}
          <br />
          <b>gender</b> : {userData.gender}
          <br />
          <b>hobbies</b> :
          {userData.hobbies.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
          <br />
          <b>city</b> : {userData.address.city}
          <br />
          <b>state</b> : {userData.address.state}
          <b>country</b> : {userData.address.country}
          <br />
          <br />
          <b>phone</b> : {userData.phoneNo}
          <br />
          <b>date Of Birth</b> : {userData.dob}
        </div>
      </div>
      <button
        className="bg-indigo-900 py-4 px-5 text-center"
        onClick={() => navigate("/updateprofile")}
      >
        Edit data
      </button>
    </div>
  );
};

export default Dashboard;
