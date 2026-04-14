import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./containers/Main";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import { PortfolioProvider } from "./contexts/PortfolioContext";

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Switch>
          <Route path="/login" component={AdminLogin} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
