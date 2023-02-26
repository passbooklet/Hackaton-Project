import Image from 'next/image'
import useAdmininput from '@/customHooks/useAdmininput';
import styles1 from "../../styles/Admininput.module.css"
import Carousel from 'react-multi-carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "../../styles/Newdeals.module.css"
import { useRouter } from "next/router";


const Newdeals = () => {
  const router = useRouter();

  const {
    data, checked, addtochart,serachtext,setserachtext,
  } = useAdmininput()
 
  const tostore = () => {
    router.push('/Store')
  }


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1555 },
      items: 7,
      backgroundColor: 'red', 
    },
    desktop: {
      breakpoint: { max: 1554, min: 1182},
      items: 4,
      backgroundColor: 'red',
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
    
    <div className={styles.carcolor}>
      <br/>
      <br/>
      <h1 className={styles.hcentre}>Events</h1>
      <div className={styles.hcentre}>
        
      <input type="text" placeholder='search' name='search' value={serachtext} onChange={(e)=>setserachtext(e.target.value)}/>
      
      </div>
      <br/>
      <br/>
    
    <Carousel responsive={responsive} className={styles.carcolor} >
          {data.filter((item)=>item.title.includes(serachtext)).map((item) => {
            return (
              <div >
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
       
      </Card.Body>
    </Card>
              </div>
            )
          })}
        </Carousel>
<div className={styles1.hcentre}>
  <button className={styles1.button13} onClick={tostore}>Go to store</button>
</div>

    </div >
  )
}

export default Newdeals
