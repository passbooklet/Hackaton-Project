import React from 'react'
import { auth, createUserWithEmailAndPassword, db, updateProfile } from "../config/database"
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react"
import { toast } from "react-toastify";
import styles from "../styles/Signup.module.css"
import Spinner from 'react-bootstrap/Spinner';

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const Signup = () => {

  const [username, setusername] = useState<string>("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const router = useRouter();
  const [error, seterror] = useState("")
  const [loader,setloader]= useState(true)

  const onSubmitHandler = async () => {
    if (!username || !email || !password) {
      seterror("please enter all the fields");
    }
    try {
setloader(false)

      const res = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(res.user, {
        displayName: username,
      }
      )
      const user =res.user
      const uid= user.uid
      let userAdding ={
        Name:username,
        email:email,
        uid:uid
      }
      await addDoc(collection(db,"users"),userAdding)
      toast.success('Successfully singup!',{
        position:"top-right",
        autoClose:5000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        theme:"colored"
      });
      router.push('/')
      setloader(true)
    } catch (e) {
      console.log("------------------------------------");
      console.log(e);
      console.log("------------------------------------");
    }

  }
  const loginpage = () => {
    router.push('/Login')
  }



  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <br />
        <br />
        <br />
        <h1 className={styles.hcentre}>Sign up</h1>



        <br/>
        <br/>

        <div className={styles.hcentre}>
          <div className={styles.inputgroup}>
            <label className={styles.label}>username</label>
            <input
              onChange={(e) => setusername(e.target.value)}
              type="text"
              placeholder="Enter your name" value={username}
              className={styles.input}
              id="Username"
            />
          </div>
        </div>
        <br />

        <div className={styles.hcentre}>

          <div className={styles.inputgroup}>
            <label className={styles.label}>Email address</label>
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              type="email"
              id="Email"
              className={styles.input}
              placeholder="Enter your email" />

          </div>
        </div>

        <br/>
        <div className={styles.hcentre}>
          <div className={styles.inputgroup}>
          <label className={styles.label} >Password</label>
          <input
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            type="password"
            name="password"
            className={styles.input}
            id="Password"
            placeholder="Enter your Password" />
            </div>
            </div>
            <br/>

        <div className={styles.hcentre}>
        {loader ?
          <button onClick={onSubmitHandler} className={styles.button} >Sigin up</button>:<Spinner  animation="border" role="status"/>}
          <button onClick={loginpage} className={styles.button} >Already logged In </button>
        </div>




      </div>
    </div>
  )
}
export default Signup