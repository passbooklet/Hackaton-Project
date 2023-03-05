import { auth, createUserWithEmailAndPassword, db, updateProfile } from "../config/database"
import { useRouter } from "next/router";
import { useState } from "react"
import { toast } from "react-toastify";


import { collection, addDoc } from "firebase/firestore";

const useSignup = () => {

  const [username, setusername] = useState<string>("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const router = useRouter();
  const [loader,setloader]= useState(true)

  const onSubmitHandler = async () => {
    if (!username || !email || !password) {
      alert("plz fill all fields")
    }
    try {
setloader(false)

      const res = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(res.user, {
        displayName: username,
      }
      )
      const user =res.user
      const uid= user.uid
      let userAdding ={
        Name:username,
        email:email,
        uid:uid
      }
      await addDoc(collection(db,"users"),userAdding)
      toast.success('Successfully singup!',{
        position:"top-right",
        autoClose:5000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        theme:"colored"
      });
      router.push('/')
      setloader(true)
    } catch (e) {
      console.log("------------------------------------");
      console.log(e);
      console.log("------------------------------------");
    }

  }
  const loginpage = () => {
    router.push('/Login')
  }



  return {
    onSubmitHandler,
    loginpage,
    loader,
    setusername,
    setemail,
    setpassword 
  }
    
  
}
export default useSignup