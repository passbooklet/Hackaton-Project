import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/header/Header';
import 'react-toastify/dist/ReactToastify.css';
import 'react-multi-carousel/lib/styles.css';
import { ToastContainer } from "react-toastify";



export default function App({ Component, pageProps }: AppProps) {
  return (

  <>
    <Header />
    <Component {...pageProps} />
    <ToastContainer />
  </>
 
  )
}
