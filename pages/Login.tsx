import React from 'react'
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react"
import { auth, signInWithEmailAndPassword } from "../config/database"
import styles from "../styles/Signup.module.css"
import Spinner from 'react-bootstrap/Spinner';
import { toast } from "react-toastify";




const login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader,setloader]= useState(true)
  const router = useRouter();

  const onSubmitHandler = async () => {

    try {
      setloader(false)
    const res =  await signInWithEmailAndPassword(auth, email, password)
    const user =res.user
      const uid= user.uid
    console.log("uid", uid);

    localStorage.setItem("uid", uid)
    
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
      setloader(true)
      router.push('/')
    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
    }
  }
  const signpage = async () => {
    router.push('/Signup')
  }




  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <br/>
        <br/>
        <br/>

        <h1 className={styles.hcentre}>Login</h1>
        <br/>
        <br/>
        <div className={styles.hcentre}>
          <div className={styles.inputgroup}>
            <label className={styles.label}>Email address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="Email"
              className={styles.input}
              id="email"
              placeholder="Enter your email" />
          </div>
        </div>
        <div className={styles.hcentre} >
          <div className={styles.inputgroup}>
            <label className={styles.label}>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              className={styles.input}
              id="Password"
              placeholder="Enter your Password" />
          </div>
        </div>
        <div className={styles.hcentre}> 
        {loader ?
          <button onClick={onSubmitHandler} className={styles.button} >Login</button>:<Spinner  animation="border" role="status"/>}
          <button onClick={signpage}  className={styles.button} >Signup with us</button>

        </div>
      </div>
    </div>
  )
}

export default login