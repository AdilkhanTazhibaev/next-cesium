import { CustomReducerProvider } from "../redux/customReducer/customReducer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CustomReducerProvider>
      <Component {...pageProps} />
    </CustomReducerProvider>
  );
}

export default MyApp;
