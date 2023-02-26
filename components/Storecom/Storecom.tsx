import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "../../styles/Newdeals.module.css"
import Card from 'react-bootstrap/Card';
import useAdmininput from '@/customHooks/useAdmininput';
import styles1 from "../../styles/Admininput.module.css"
import { ChangeEvent, useState, useEffect } from "react"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/database'



const Storecom = () => {
    const {
        data,
        checked,
        serachtext,
        setserachtext,
    } = useAdmininput()
    const [user, loading, error] = useAuthState(auth);
    const [jion, setjion] = useState("");

    useEffect(() => {
        if (user) {
            setjion("jion");
        } else {
            setjion("");
        }
    }, [user]);


    return (
        <div>
            <div className={styles.carcolor}>
                <br />
                <br />
                <h1 className={styles.hcentre}>Events</h1>
                <div className={styles.hcentre}>

                    <input type="text" placeholder='search' name='search' value={serachtext} onChange={(e) => setserachtext(e.target.value)} />

                </div>
                <br />
                <br />

                <Container fluid>
                    <Row>


                        {data.filter((item) => item.title.includes(serachtext)).map((item1) => {
                            return (
                                <Col xs={6} md={4} lg={3}>
                                    <span className={styles.displayflex} >
                                        <Card className={styles.widthheight}>
                                            <Card.Img variant="top" src={item1.attachmentURL} />
                                            <Card.Body>
                                                <Card.Title>{item1.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{item1.location}</Card.Subtitle>
                                                <Card.Subtitle className="mb-3 text-muted">{item1.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {item1.description}
                                                </Card.Text>
                                                <Card.Subtitle className="mb-2 text-muted">{item1.time}</Card.Subtitle>

                                            </Card.Body>
                                        </Card>
                                    </span>
                                    {user &&
                                        <div className={styles1.hcentre}> <button className={styles1.button13} onClick={() => checked(item1)} >{jion}</button>
                                

                                        </div>}
                            </Col>
                            )
                        })}
                    </Row>
                </Container>
            </div></div>

    )
}

export default Storecom