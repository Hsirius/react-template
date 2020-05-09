import React from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import styles from "../Login/index.module.scss";

const Home = () => {
  const store = useLocalStore(() => ({
    msg: "home",
  }));
  return useObserver(() => (
    <div>
      <p>{store.msg}</p>
      <Link to={"/about"} className={styles.loginBtn}>
        to about
      </Link>
    </div>
  ));
};
export default Home;
