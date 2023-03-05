import Image from 'next/image'
import styles from '../../styles/header.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useHeader from '@/customHooks/useHeader';



const Header = () => {

  const { toadmin, tostore, tologin, toaddtochart, tologout, login, signout,user } = useHeader();


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

            <Nav.Link className={styles.cta} onClick={toadmin}>
              <span className={styles.cta1}> Create an Event </span>

            </Nav.Link>


          </Nav>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link onClick={toaddtochart} className={styles.cta}>
              <span className={styles.cta1}> Jioned</span>
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