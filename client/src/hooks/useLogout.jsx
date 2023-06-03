import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/user/userInfoSlice";

function useLogout() {
  const history = useHistory();
  const dispatch = useDispatch();

  return () => {
    console.log("logout!");
    localStorage.removeItem("jwtToken");
    dispatch(userAction.removeUser());
    history.push("/");
  };
}
export default useLogout;
