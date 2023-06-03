import React, { Fragment, useEffect, useState } from "react";
import Profile from "../components/Profile";
import { useSelector } from "react-redux";

export default function Me() {
  const userToken = useSelector((state) => state.userInfo.value.token);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userToken) return;
    const fetchUser = async () => {
      const res = await fetch("http://localhost:4000/api/user/Me", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = await res.json();
      setUserData(data.currentUser);
    };
    fetchUser();
  }, [userToken]);

  return <Fragment>{userData && <Profile user={userData}></Profile>}</Fragment>;
}
