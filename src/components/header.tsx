import React, { useState } from "react";
import styles from "./../css/components/header.module.css"
import { store } from "../store";
import userReducer, { userServices } from "../reducers/userSilce";

export const Header: React.FC = () => {
  
  const [currentUser,setCurrentUser] = useState<Object | undefined>()
  store.subscribe(()=>{
    // console.log(store.getState().userReducer.currentUser);
    setCurrentUser(store.getState().userReducer.currentUser)
  })
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <a href="/">Best Application</a>
      </div>
      <div className={styles.actions}>
        <button onClick={()=>{
          if(currentUser) {
            store.dispatch(userServices.actions.RemoveCurrentUser())
          }
          else {
            window.location.href = "/signin"
          }
        }} className={styles.btn}>{currentUser ? "Sign Out":"Sign In"}</button>
      </div>
    </div>
  );
};