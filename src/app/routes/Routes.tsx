import React from "react"
import { Route, Switch } from "react-router-dom"
import Front from "features/Frontpage/Front"
import DownloadsContainer from "features/Downloads/DownloadsContainer"
import About from "features/About/About"
import InfoPageContainer from "features/EditablePages/InfoPageContainer"
import EditInfoPage from "features/EditablePages/EditInfoPage"
import AddPage from "features/EditablePages/AddPage"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"
import PageNotReady from "common/components/PageNotReady"
import PrivateRoute from "./PrivateRoute"
import useGoogleAnalytics from "common/hooks/useGoogleAnalytics"

const Routes = () => {
  useGoogleAnalytics()

  return (
    <Switch>
      <Route exact path="/" component={Front} />
      <Route exact path="/about" component={About} />
      <Route exact path="/downloads" component={DownloadsContainer} />
      {/* Authentication routes */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/:provider/callback" component={OauthCallback} />
      <Route exact path="/load/auth" component={AuthLoader} />
      <PrivateRoute exact path="/logout" component={Logout} />
      {/* Editable page routes */}
      <Route exact path="/:section/:name" component={InfoPageContainer} />
      <PrivateRoute
        exact
        path="/:section/:name/edit"
        component={EditInfoPage}
      />
      <Route
        exact
        path="/:section/:name/:subname"
        component={InfoPageContainer}
      />
      <PrivateRoute
        exact
        path="/:section/:name/:subname/edit"
        component={EditInfoPage}
      />
      <PrivateRoute exact path="/addpage" component={AddPage} />
      <Route exact path="/privacy-policy" component={InfoPageContainer} />
      {/* Page not found routes */}
      <Route exact path="*" component={PageNotReady} />
    </Switch>
  )
}

export default Routes
