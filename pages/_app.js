import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Header } from "../components/header";
import "../styles/globals.css";
import { store } from "./../redux/reducers";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div style={{ backgroundColor: "#E5E5E5" }}>
        <Header />
        <Component {...pageProps} />
      </div>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
