import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [user1]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({...doc.data(),id:doc.id});
      });
      setMsgs(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
     const user2online=chat.isOnline
    
 
   };
  const user2Status=chat.isOnline;

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  if(user2Status){
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      MessageStatus:"delivired",
      Msgupdate:false,
      createdAt: Timestamp.fromDate(new Date()),
     
    });
  }else if(!user2Status){
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      MessageStatus:"send",
      Msgupdate:true,
      createdAt: Timestamp.fromDate(new Date()),
     
    });
  }
  // await addDoc(collection(db, "messages", id, "chat"), {
  //   text,
  //   from: user1,
  //   to: user2,
  //   MessageStatus:"send",
  //   Msgupdate:true,
  //   createdAt: Timestamp.fromDate(new Date()),
   
  // });
  
  await setDoc(doc(db, "lastMsg", id), {
    text,
    from: user1,
    to: user2,
    createdAt: Timestamp.fromDate(new Date()),
    unread: true,
  });
  
    setText("");
    
  
  };
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              
                {msgs.length
                  ? msgs.map((msg, i) => (
                      <Message key={i} msg={msg} user1={user1}   />
                    ))
                  : null}
                 
            
              
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Home;

