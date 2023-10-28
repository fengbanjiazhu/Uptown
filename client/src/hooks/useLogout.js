import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/user/userInfoSlice";

function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return () => {
    console.log("logout!");
    localStorage.removeItem("jwtToken");
    dispatch(userAction.removeUser());
    navigate("/");
  };
}
export default useLogout;
