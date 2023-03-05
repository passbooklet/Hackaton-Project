import { useState, useEffect } from "react"
import { auth } from '../config/database'
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';



const useHeader = () => {

    const [user] = useAuthState(auth);
    const router = useRouter()
    const [login, setlogin] = useState("");
    const [signout, setsignout] = useState("");

    useEffect(() => {
        if (user) {
            setlogin("");
            setsignout("signout");
        } else {
            setlogin("login");
            setsignout("");
        }
    }, [user]);



    const tostore = () => {
        router.push('/Store')
    }
    const tologin = () => {
        router.push('/Login')
    }
    const toadmin = () => {
        router.push('/Admin')
    }

    const toaboutus = () => {
        router.push('/Createjoin')
    }
    const toaddtochart = () => {
        router.push('/User')
    }
    const tologout = () => {
        signOut(auth).then(() => {
            // settoggle(false)
        }).catch((error) => {
            console.log(error);

        });
    }




    return {
        tostore,
        tologin,
        toaboutus,
        toaddtochart,
        tologout,
        login,
        signout,
        toadmin,
        user,
    }


}

export default useHeader