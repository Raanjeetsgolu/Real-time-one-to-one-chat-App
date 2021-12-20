import React, { useState, useEffect } from "react";

import Img from "../image1.jpg";
import {  db, auth } from "../firebase";

import { getDoc, doc } from "firebase/firestore";


const Profile = () => {

  const [user, setUser] = useState();


  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
  }, []);

  
  return user ? (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={Img} alt="avatar" />
          
        </div>
        <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
          <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
