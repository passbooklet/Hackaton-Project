import { useRouter } from "next/router";
import { format } from "path";
import { async } from "@firebase/util";
import { ChangeEvent, useState,useEffect } from "react"
import { db, storage } from "../config/database"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";


type DataType = {
  title: string,
  location: string,
  description: string,
  attachmentURL: string
  id: string,
  time:string
  date:any
  creator:string
}
type Creator1type={
  creator:string
}


const useAdmininput =()=>{

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
const [re, setre] = useState<string>('')
const [toggle, settoggle] = useState(true)
const [addtochart, setaddtochart] = useState<DataType[]>([])
const [serachtext,setserachtext] = useState<string>("")

// ----------------------------------------------------------state end-----------------------------------------------------

// ---------------------------------------------------------use effect-----------------------------------------------------

useEffect(() => {
  onEditHandler();
  getdata();
  getdoneHandler();
}, [])
// -------------------------------------------------------------use effect end-----------------------------------------------------





// ---------------------------------------------------ADD DATA TO FIREBASE------------------------------------------------

const save = async () => {
    if (!imagepic|| !description || !title||!location||!time ||!date) {
      alert("please enter all data");
    } else {
// ADD IMAGE TO STORAGE
      const storageRef = ref(storage, title);
      const result = await uploadBytes(storageRef,imagepic)
      const downloadURL = await getDownloadURL(result.ref)
      // const querySnapshot = await getDocs(collection(db, "users"));
      // const creator2= querySnapshot?.Name
      // console.log(creator2);
      
    // setcreator(creator2)
// ADD THE title
      try {
        const creatorUid = await localStorage.getItem("uid")
        console.log("creatorUid",creatorUid)
        const newinput = {
          title,
         description,
         attachmentURL:downloadURL,
         location,
         time,
         date,
         creator:creatorUid,
        }
        const docRef1 = await addDoc(collection(db, "newdeals"), newinput);
         setdata([...data, { ...newinput, id: docRef1.id }])
      }
      catch (e) {
        console.error(e);
      }
    }   
    setAttachmentURL("")
    setdescription("")
    settitle("")
    setlocation("")
    settime("")
    setdate("")
    setcreator("")
    setimagepic({})
}
// COLLECTING THE IMAGE FORM THE INPUT
const savefile = async (e: ChangeEvent<HTMLInputElement>) => {
  if (null != e.target.files) {
    setimagepic(e.target.files[0])
  } else {
    alert("the selected picture is null")
  }
}
const savedate = async (e: ChangeEvent<HTMLInputElement>) => {
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
    const uid = await localStorage.getItem("uid")
    const querySnapshot = await getDocs(query(collection(db, "newdeals"), where("creator", "==", uid)));
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
        creator:doc.data().creator,


      });
    });
    setdata(datalist);
  } catch (error) {
    console.log('================catch====================');
    console.log(error);
    console.log('====================================');
  } finally {

  }
}
// ---------------------------------------------------GET DATA FROM FIREBASE----------------------------------------------
// ------------------------------------------------------------END--------------------------------------------------------




// ---------------------------------------------------DELETE DATA FROM FIREBASE----------------------------------------------

const cancel = async (item: DataType) => {
  try {
    // DELETE THE DATE FROM NEWDEALS
    await deleteDoc(doc(db, "newdeals", item.id));
    let filtered = data.filter((e) => {
      if (item.id != e.id)
        return e
    })
    setdata(filtered)
    // DELETE THE IMAGE FROM FIREBASE
    const desertRef = ref(storage, item.title)
    deleteObject(desertRef)
    .catch((error) => {
      console.log('================catch====================');
    console.log(error);
    console.log('====================================');
    });
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
  try {
    await updateDoc(doc(db, "newdeals", re), {
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
    setdata(updatedTodos);
    settoggle(true);
    setAttachmentURL("")
    setdescription("")
    settitle("")
    setlocation("")
    setdate("")
  } catch (error) {
    console.log('================catch====================');
    console.log(error);
    console.log('====================================');
  }
}
// ---------------------------------------------------UPDATE DATA FROM FIREBASE--------------------------------------------
// ----------------------------------------------------------END-----------------------------------------------------------



// --------------------------------------------------ADD DATA TO ADDCHART FIREBASE----------------------------------------
const checked = async (item:DataType) => {
  try {
    const newinput = {
      title:item.title,
     description:item.description,
     attachmentURL:item.attachmentURL,
     location:item.location,
     time:item.time,
     date:item.date,
     creator:item.creator
  
    }
    const docRef1 = await addDoc(collection(db, "addtochartnewdeals"), newinput);
     setaddtochart([...data, { ...newinput, id: docRef1.id }])
  }catch (error) {
    console.log('================catch====================');
    console.log(error);
    console.log('====================================');
  }
}
const getdoneHandler = async () => {
  try {
      // getting add form donetodo in firebase
      const querySnapshot = await getDocs(collection(db, "addtochartnewdeals"));
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
            creator:doc.data().creator,
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
    await deleteDoc(doc(db, "addtochartnewdeals", item.id));
    let filtered = data.filter((e) => {
      if (item.id != e.id)
        return e
    })
    setdata(filtered)
    
  } catch (error) {
    console.log('================catch====================');
    console.log(error);
    console.log('====================================');
  }
}
// ---------------------------------------------------ADD DATA TO ADDCHART FIREBASE----------------------------------------
// --------------------------------------------------------------END-------------------------------------------------------
















// ---------------------------------------------------RETURN HAS STARTED---------------------------------------------------


return{
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
    savedate,
    setaddtochart,
    cancelcheaked,

}
}
export default useAdmininput