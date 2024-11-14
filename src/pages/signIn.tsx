import { InputHTMLAttributes, useRef } from "react"
import { Header } from "../components/header"
import styles from "./../css/signIn.module.css"
import { userServices } from "../reducers/userSilce"
import { store } from "../store"
export const SignIn: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null) 
  const SetCurrentUser = userServices.actions.SetCurrentUser  
 
  return (
    <div className={styles.signIn}>
      <Header/>
      <div className={styles.body}>
        <div className={styles.form}>
          <span>Sign In</span>
          <input ref={usernameRef} type="text" placeholder="Username Text Field" />
          <button onClick={()=> {
              if(usernameRef.current?.value.length == 0) alert("Username is empty");
              else {
                fetch("https://jsonplaceholder.typicode.com/users?username="+usernameRef.current?.value)
                .then(res => res.json())
                .then(res => {
                  if(res.length == 0) alert("Username not found");
                  else {
                    // alert("Username found");
                    store.dispatch(SetCurrentUser({currentUser:res}));
                    window.location.href = "/"
                  }
                })
              }
          }}>Send Button</button>
        </div>
      </div>
    </div>
  )
} 