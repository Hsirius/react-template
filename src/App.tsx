import { createBrowserHistory } from "history";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Routes } from "./menu";
import useRootStore, { RootStore, rootStoreContext } from "./models";
import Login from "./pages/Login";

export const history = createBrowserHistory();

const Main = observer(() => {
  const rootStore = useRootStore();
  useEffect(() => {
    rootStore.global.fetchCurrentUser();
  }, [rootStore]);
  return rootStore.global.currentUser ? <Routes /> : null;
});

const App = () => {
  const [rootStore] = useState(() => new RootStore());
  return (
    <Router history={history}>
      <rootStoreContext.Provider value={rootStore}>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" render={() => <Main />}></Route>
        </Switch>
      </rootStoreContext.Provider>
    </Router>
  );
};

export default App;
