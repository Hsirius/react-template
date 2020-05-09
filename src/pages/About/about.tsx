import React from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import styles from "../../App.module.scss";

const About = () => {
  const store = useLocalStore(() => ({
    msg: "about",
  }));
  return useObserver(() => (
    <div className={styles.content_box}>
      <div className={styles.right_content}>
        <p>{store.msg}</p>
        <Link to={"/about/list"}>to list</Link>
      </div>
    </div>
  ));
};
export default About;
