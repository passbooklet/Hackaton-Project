import Admininput from '@/components/admininput/Admininput'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/database'
import { ChangeEvent, useState, useEffect } from "react"
import { useRouter } from "next/router";
import styles from "../styles/Newdeals.module.css"
import styles1 from "../styles/Admininput.module.css"






const Admin = () => {

  const [user, loading, error] = useAuthState(auth);
  const [jion, setjion] = useState(true);
  const router = useRouter();

  const tologin = () => {
    router.push('/Login')
  }
  useEffect(() => {
    if (user) {
        setjion(false);
    } else {
        setjion(true);
    }
}, [user]);
  return (
    <div>
 {user ? <Admininput/>: <div className={styles.carcolor}>
      <br/><br/>
      <h1 className={styles.hcentre}>You are not logged in</h1>
      <div className={styles.hcentre}>
      <button className={styles1.button13} onClick={tologin}>login in</button>
      </div> </div> }
    
    
    </div>
  )
}

export default Admin