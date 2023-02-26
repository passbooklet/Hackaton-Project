import Image from 'next/image'
import { ChangeEvent, useState,useEffect } from "react"
import styles from '../../styles/header.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { auth } from '../../config/database'
import { useRouter } from "next/router";
import {  signOut } from "firebase/auth";
import { userInfo } from 'os';
import { useAuthState } from 'react-firebase-hooks/auth';



const Header = () => {
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

   const [toggle, settoggle] = useState(true);
   const [login, setlogin] = useState("");
   const [signout, setsignout] = useState("");

   useEffect(() => {
    if (user) {
      setlogin("");
      setsignout("signout");
    } else {
      setlogin("login");
      setsignout("");
    }
  }, [user]);



  const tostore = () => {
    router.push('/Store')
  }
  const tologin = () => {
    router.push('/Login')
  }
  const toadmin =()=>{
    router.push('/Admin')
  }
 
  const toaboutus = () => {
    router.push('/Aboutus')
  }
  const toaddtochart = () => {
    router.push('/User')
  }
  const tologout =()=>{
    signOut(auth).then(() => {
      // settoggle(false)
    }).catch((error) => {
      console.log(error);
      
    });
  }




  return (
    <Navbar className={styles.navcolor} collapseOnSelect expand="lg">
      <Container fluid>
        <Navbar.Brand href="/"><Image alt="logo" src="/sneaker.png" width={50} height={50} />wolf-events</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center flex-grow-1 ">
            <Nav.Link className={styles.cta} onClick={tostore}>
              <span className={styles.cta1}> Events </span>

            </Nav.Link>
            <Nav.Link onClick={toaddtochart} className={styles.cta}>
              <span className={styles.cta1}> Users</span>
            </Nav.Link>
            <Nav.Link className={styles.cta} onClick={toadmin}>
              <span className={styles.cta1}> Create an Event </span>

            </Nav.Link>
           
            
          </Nav>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link onClick={toaboutus} className={styles.cta}>
              <span className={styles.cta1}> About us </span>

            </Nav.Link>
           
              <>
              {!user ? (
  <Nav.Link onClick={tologin} className={styles.cta}>
    <span className={styles.cta1}>{login}</span>
  </Nav.Link>
) : (
  <Nav.Link onClick={tologout} className={styles.cta}>
    <span className={styles.cta1} onClick={tologout}>{signout}</span>
  </Nav.Link>
)}
                </>
             
       
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header