import React from "react";

import UpdateProfile from "./updateProfile/updateProfile";
import UpdatePassword from "./updateProfile/updatePassword";

const Profile = (props) => {
  return (
    <div className="user-view__form-container">
      <UpdateProfile currentUser={props.user}></UpdateProfile>
      <UpdatePassword></UpdatePassword>
    </div>
  );
};

export default Profile;
