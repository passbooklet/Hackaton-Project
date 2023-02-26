import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useAdmininput from '@/customHooks/useAdmininput';
import styles from "../../styles/Admininput.module.css"
import { Images } from 'react-bootstrap-icons';
import Carousel from 'react-multi-carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const Admininput = () => {

  const {
    save,
    savefile,
    title,
    description,
    location,
    setdescription,
    setlocation,
    settitle,
    data,
    cancel,
    update,
    toggle,
    onEditHandler,
    time,
    settime,
    date,
    setdate,
      
  } = useAdmininput()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1555 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 1554, min: 1182},
      items: 4
    },
    tablet: {
      breakpoint: { max: 1180, min: 894 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 894, min: 599},
      items: 2
    },
    minimobile: {
      breakpoint: { max: 598, min: 0 },
      items: 1
    }
  };


  return (
    <div>
      <div className={styles.card}>
        <br />
        <h1 className={styles.hcentre}>New Deals</h1>
        <br />

        <div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default" >
              title Name
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => { settitle(e.target.value) }}
              type="text"
              value={title}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </div>
       
       
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default" >
              Desprition
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => { setdescription(e.target.value) }}
              type="text"
              value={description}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </div>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default" >
              time
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => { settime(e.target.value) }}
              type="time"
              value={time}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          </div>
          <div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default" >
              location
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => { setlocation(e.target.value) }}
              type="text"
              value={location}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          </div>
          <div className={styles.hcentre}>
          <input 
             type="date"
            onChange={(e) => { setdate(e.target.value) }}
            placeholder=".." />
         
          </div>
        <br />
        <div className={styles.hcentre}>
          <input
            style={{ display: "none" }}
            id="file" type="file"
            onChange={savefile}
            placeholder=".." />
          <label htmlFor="file"><Images width={50} height={50} />
          </label>
        </div>
        
        
        <br />
        <div className={styles.hcentre}>
          {toggle ? <button onClick={save} className={styles.button} >Add to new deals</button> :
              <button onClick={onEditHandler} className={styles.button} >EDIT</button>
            }
        </div>
        <br />
        <br />
        <div>

        </div>
        
        
        
      </div>


<br/>
<br/>
<br/>
<br/>







{/* to display new deals for delete and updating */}
      <div>
        <Carousel responsive={responsive}>
          {data.map((item) => {
            return (
              <div>
               <Card className={styles.widthheight}>
      <Card.Img variant="top"  src={item.attachmentURL} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.location}</Card.Subtitle>
        <Card.Subtitle className="mb-3 text-muted">{item.date}</Card.Subtitle>
        <Card.Text>
        {item.description}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">{item.time}</Card.Subtitle>
        <div className={styles.hcentre}>
        <button className={styles.button12} onClick={() => cancel(item)}>cancel</button>
        <button className={styles.button13}  onClick={() => update(item)}>update</button>
        </div>
      </Card.Body>
    </Card>
              </div>
            )
          })}
        </Carousel>
      </div>
<div>
  
</div>
    </div>
  )
}

export default Admininput