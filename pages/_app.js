import "../styles/globals.css"
import UserProvider from "../Context/UserProvider"
import { ThemeProvider } from "theme-ui"
import AlertProvider from "../components/Alert/AlertProvider"

import { theme } from "../components/Themes/theme"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default MyApp
