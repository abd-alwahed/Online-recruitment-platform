import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "../providers/AuthProvider";
import NavBar from "../components/navbar";
import { useRouter } from "next/router";
import Footer from "../components/Footer";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(router.asPath);
  const blockedPathes = ['/log-in', '/sign-up', '/employee/create', '/company/create',]

  const blo = []
  for (let i = 0; i < 100; i++) {
    blo.push(`/print/${i}`)
    blockedPathes.push(`/print/${i}`)

  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <AuthProvider>
        {!blockedPathes.some(e => e === (router.asPath)) && <NavBar />}
        <Component {...pageProps} />
        {!blockedPathes.some(e => e === (router.asPath)) && < Footer />}
      </AuthProvider>
    </>
  );
}

export default MyApp;
