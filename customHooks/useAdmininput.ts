import { async } from "@firebase/util";
import { ChangeEvent, useState, useEffect } from "react"
import { db, storage } from "../config/database"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, setDoc } from "firebase/firestore";
import { DataType } from "@/types/DataType";
import { DataType2 } from "@/types/DataType2";


const useAdmininput = () => {

  // --------------------------------------------------------state start----------------------------------------------------
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [location, setlocation] = useState("")
  const [attachmentURL, setAttachmentURL] = useState("")
  const [time, settime] = useState("")
  const [creator, setcreator] = useState("")
  const [date, setdate] = useState("")
  const [imagepic, setimagepic] = useState<any>({})
  const [data, setdata] = useState<DataType[]>([])
  const [pridata, setpridata] = useState<DataType2[]>([])
  const [re, setre] = useState<string>('')
  const [toggle, settoggle] = useState(true)
  const [addtochart, setaddtochart] = useState<DataType[]>([])
  const [serachtext, setserachtext] = useState<string>("")
  const [inner, setinner] = useState<string>("")
  const [loader, setloader] = useState(true)


  // ----------------------------------------------------------state end-----------------------------------------------------

  // ---------------------------------------------------------use effect-----------------------------------------------------

  useEffect(() => {
    onEditHandler();
 
    getdata()
    getdoneHandler();
  }, [])
  // -------------------------------------------------------------use effect end-----------------------------------------------------





  // ---------------------------------------------------ADD DATA TO FIREBASE------------------------------------------------

  const save = async () => {

    // if the value is null
    if (!imagepic || !description || !title || !location || !time || !date) {
      alert("please enter all data");
    } else {

      setloader(false)

      // ADD IMAGE TO STORAGE for login user
      try {

        const storageRef = ref(storage, title);
        const result = await uploadBytes(storageRef, imagepic)
        const downloadURL = await getDownloadURL(result.ref)

        // ADD LOGGED USER CREATE EVENT INTO FIREBASE

        const creatorUid123: any = await localStorage.getItem("uid")
        localStorage.setItem("creatorUid123", creatorUid123);
        console.log(creatorUid123);

        const newinput: any = {
          title,
          description,
          attachmentURL: downloadURL,
          location,
          time,
          date,
          creator: creatorUid123,
        }
        const id1: string =  Date.now().toString()
        const docRef = await setDoc(doc(db, "events", id1), newinput);
        setdata([...data, { ...newinput, id: id1 }]);



        // ADD PUBLIC USER CREATE EVENT INTO FIREBASE


        
        setpridata([...pridata, { ...newinput, id: id1 }]);
        console.log("data", data);

        console.log("pridata", pridata);

      }
      catch (e) {
        console.error(e);
      }
    }


    // EMETY THE INPUT VALUE
    setAttachmentURL("")
    setdescription("")
    settitle("")
    setlocation("")
    settime("")
    setdate("")
    setcreator("")
    setimagepic({})
    setloader(true)
  }

  // COLLECTING THE IMAGE FORM THE INPUT
  const savefile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (null != e.target.files) {
      setimagepic(e.target.files[0])
    } else {
      alert("the selected picture is null")
    }
   
  }


  // ---------------------------------------------------ADD DATA TO FIREBASE------------------------------------------------
  // -------------------------------------------------------------END-------------------------------------------------------






  // ---------------------------------------------------GET DATA FROM FIREBASE----------------------------------------------
  const getdata = async () => {
    try {

      // GET LOGGED USER INTO EVENT FROM FIREBASE

      const uid = await localStorage.getItem("uid")
      const querySnapshot = await getDocs(query(collection(db, "events"), where("creator", "==", uid)));

      let datalist: DataType[] = []
      querySnapshot.forEach((doc) => {
        datalist.push({
          id: doc.id,
          title: doc.data().title,
          location: doc.data().location,
          description: doc.data().description,
          attachmentURL: doc.data().attachmentURL,
          time: doc.data().time,
          date: doc.data().date,
          creator: doc.data().creator,
        });
      });
      setdata(datalist);

      // GET PUBLIC USER INTO EVENT FROM FIREBASE
      const querySnapshot1 = await getDocs(collection(db, "events"));
      let datalist1: DataType2[] = []
      querySnapshot1.forEach((doc) => {
        datalist1.push({
          id: doc.id,
          title: doc.data().title,
          location: doc.data().location,
          description: doc.data().description,
          attachmentURL: doc.data().attachmentURL,
          time: doc.data().time,
          date: doc.data().date,
        });
      });
      setpridata(datalist1);
    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    } finally {

    }
  }
  // // ---------------------------------------------------GET DATA FROM FIREBASE----------------------------------------------
  // ------------------------------------------------------------END--------------------------------------------------------




  // ---------------------------------------------------DELETE DATA FROM FIREBASE----------------------------------------------

  const cancel = async (item: DataType) => {
    try {

      // DELETE LOGGED USER INTO EVENT FROM FIREBASE

        // DELETE LOGGED USER INTO EVENT FROM FIREBASE

        await deleteDoc(doc(db, "events", item.id));
        let filtered = data.filter((e) => {
          if (item.id != e.id)
            return e
        })
        setdata(filtered)
  
        // GET public USER INTO EVENT FROM FIREBASE
  
        setpridata(filtered)
  
  
        // DELETE THE IMAGE FROM FIREBASE
        const desertRef = ref(storage, item.title)
        deleteObject(desertRef)


    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    }
  }

  // ---------------------------------------------------DELETE DATA FROM FIREBASE--------------------------------------------
  // --------------------------------------------------------------END-------------------------------------------------------



  // ---------------------------------------------------UPDATE DATA FROM FIREBASE--------------------------------------------

  const update = (item: DataType) => {
    // storing id in state re and the description in input
    settoggle(false)
    settitle(item.title)
    setlocation(item.location)
    setdescription(item.description)
    settime(item.time)
    setre(item.id)
    setdate(item.date)
  }

  const onEditHandler = async () => {

    // UPDATE LOGGED USER INTO EVENT FROM FIREBASE
    try {
      await updateDoc(doc(db, "events", re), {
        title,
        location,
        description,
        time,
        date,
      });
      let updatedItem = {
        title,
        location,
        description,
        attachmentURL,
        time,
        date,
        creator,
        id: re
      }
      let updatedTodos = data.map((todo) => {
        if (re == todo.id) {
          return updatedItem
        }
        else {
          return todo
        }
      })
      setdata(updatedTodos)


      // UPDATE PUBLIC USER INTO EVENT FROM FIREBASE

   
      setpridata(updatedTodos);


      // EMETY THE INPUT VALUE
      settoggle(true);
      setAttachmentURL("")
      setdescription("")
      settitle("")
      setlocation("")
      setdate("")
      setcreator("")
    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    }
  }
  // ---------------------------------------------------UPDATE DATA FROM FIREBASE--------------------------------------------
  // ----------------------------------------------------------END-----------------------------------------------------------



  // --------------------------------------------------ADD DATA TO JION FIREBASE----------------------------------------
  const checked = async (item: DataType2) => {

    const creatorUid = await localStorage.getItem("uid")
    const creatorUid123 = await localStorage.getItem("creatorUid123")
   console.log("first", creatorUid);
   console.log("second", creatorUid123);
   
   

    try {
      const newinput: any = {
        title: item.title,
        description: item.description,
        attachmentURL: item.attachmentURL,
        location: item.location,
        time: item.time,
        date: item.date,
        creator: creatorUid,
      }
      const docRef1 = await addDoc(collection(db, "joinevents"), newinput);
      setaddtochart([...addtochart, { ...newinput, id: docRef1.id }])
    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    }
  }












  const getdoneHandler = async () => {

    try {


      const uid = await localStorage.getItem("uid")
      const querySnapshot = await getDocs(query(collection(db, "joinevents"), where("creator", "==", uid)));


      // getting add form donetodo in firebase
      let datalist1: DataType[] = []
      querySnapshot.forEach((doc) => {
        datalist1.push({
          id: doc.id,
          title: doc.data().title,
          location: doc.data().location,
          description: doc.data().description,
          attachmentURL: doc.data().attachmentURL,
          time: doc.data().time,
          date: doc.data().date,
          creator: doc.data().creator,
        });
      });
      setaddtochart(datalist1);

    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    }
  }





  const cancelcheaked = async (item: DataType) => {
    try {
      await deleteDoc(doc(db, "joinevents", item.id));
      let filtered = data.filter((e) => {
        if (item.id != e.id)
          return e
      })
      setaddtochart(filtered)

    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    }
  }
  // ---------------------------------------------------ADD DATA TO ADDCHART FIREBASE----------------------------------------
  // --------------------------------------------------------------END-------------------------------------------------------
















  // ---------------------------------------------------RETURN HAS STARTED---------------------------------------------------


  return {
    save,
    savefile,
    title,
    description,
    location,
    setdescription,
    setlocation,
    settitle,
    time,
    settime,
    data,
    cancel,
    update,
    toggle,
    onEditHandler,
    checked,
    addtochart,
    setserachtext,
    serachtext,
    date,
    setdate,
    pridata,
    setpridata,
    setaddtochart,
    cancelcheaked,
    loader,

  }
}
export default useAdmininput