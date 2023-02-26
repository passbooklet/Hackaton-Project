import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "../../styles/Newdeals.module.css"
import Card from 'react-bootstrap/Card';
import useAdmininput from '@/customHooks/useAdmininput';
import styles1 from "../../styles/Admininput.module.css"
const Usercom = () => {
    const {
        data, 
        checked,
         addtochart, 
         serachtext, 
         setserachtext,
         setaddtochart,
         cancelcheaked,
    } = useAdmininput()
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


                    {addtochart.map((item1) => {
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
                                <div className={styles1.hcentre}>
                                <button className={styles1.button12} onClick={() => cancelcheaked(item1)} >Delete</button>

                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div></div>

    )
}

export default Usercom