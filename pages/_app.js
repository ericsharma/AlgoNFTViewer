import "../styles/globals.css"
import UserProvider from "../Context/UserProvider"
import { ThemeProvider } from "theme-ui"

import { theme } from "../components/Themes/theme"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  )
}

export default MyApp
