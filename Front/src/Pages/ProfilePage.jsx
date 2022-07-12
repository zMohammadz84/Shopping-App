import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/user1 (2).png";

const ProfilePage = () => {
  const { user } = useSelector((store) => store.signupOrLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="p-5">
      <div className="flex flex-col gap-y-5 md:gap-y-0 sm:flex-row max-w-2xl justify-between items-center m-auto shadow-md sm:p-10 p-3 rounded-md">
        <div className=" flex justify-center items-center w-32">
          <img src={userImg} alt="Profile" />
        </div>
        <div className="flex flex-col gap-y-2 text-base sm:text-lg">
          <div className="flex justify-between items-center gap-x-10">
            <p>Name : </p>
            <p>{user.name}</p>
          </div>
          <div className="flex justify-between items-center gap-x-10">
            <p>Email : </p>
            <p>{user.email}</p>
          </div>
          <div className="flex justify-between items-center gap-x-10">
            <p>Phone Number : </p>
            <p>{user.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
