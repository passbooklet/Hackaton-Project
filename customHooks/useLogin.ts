import { useRouter } from "next/router";
import { useState } from "react"
import { auth, signInWithEmailAndPassword } from "../config/database"
import { toast } from "react-toastify";




const uselogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader, setloader] = useState(true)
  const [loader2, setloader2] = useState(true)

  const router = useRouter();

  const onSubmitHandler = async () => {

    try {
      setloader(false)
      const res = await signInWithEmailAndPassword(auth, email, password)
      const user: any = res.user
      const uid = user.uid
      const displayname = user.displayName
      const email1 = user.email



      localStorage.setItem("uid", uid);
      localStorage.setItem("displayname", displayname);
      localStorage.setItem("email", email1)

      console.log("displayname", displayname);
      console.log("displayname", email1);

      console.log("uid", uid);
      toast.success('Successfully singup!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      setloader(true)
      router.push('/')
    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
    }
  }
  const signpage = async () => {
    setloader2(false)
    router.push('/Signup')
    setloader2(true)

  }




  return {
    setEmail,
    setPassword,
    onSubmitHandler,
    signpage,
    loader,
    loader2,

  }
}

export default uselogin