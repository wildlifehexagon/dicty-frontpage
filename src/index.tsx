import "common/utils/polyfills"
import React from "react"
import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import { AuthProvider } from "features/Authentication/AuthStore"
import App from "app/layout/App"
import AppProviders from "app/layout/AppProviders"
import "common/utils/icons" // fontawesome library
import "fontsource-roboto"

ReactDOM.render(
  <AuthProvider>
    <AppProviders>
      <CssBaseline />
      <App />
    </AppProviders>
  </AuthProvider>,
  document.getElementById("root"),
)
