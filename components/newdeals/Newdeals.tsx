import useAdmininput from '@/customHooks/useAdmininput';
import styles1 from "../../styles/Admininput.module.css"
import Carousel from 'react-multi-carousel';
import Card from 'react-bootstrap/Card';
import styles from "../../styles/Newdeals.module.css"
import { useRouter } from "next/router";
import useCorres from '@/customHooks/useCorres';


const Newdeals = () => {

  const router = useRouter();
  const { data, serachtext, setserachtext, pridata, } = useAdmininput()
  const { responsive } = useCorres()

  const tostore = () => {
    router.push('/Store')
  }


return (

  <div className={styles.carcolor}>
    <br />
    <br />
    <h1 className={styles.hcentre}>Events</h1>
    <div className={styles.hcentre}>

      <input type="text" placeholder='search' name='search' value={serachtext} onChange={(e) => setserachtext(e.target.value)} />

    </div>
    <br />
    <br />

    <Carousel responsive={responsive} className={styles.carcolor} >
      {pridata.filter((item) => item.title.includes(serachtext)).map((item,index) => {
        return (
          <div >
            <Card className={styles.widthheight}>
              <Card.Img variant="top" src={item.attachmentURL} />
              <Card.Body>
                <Card.Title key={index}>{item.title}</Card.Title>
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
