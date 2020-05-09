import { observable, action } from "mobx";
import { history } from "../App";

class Global {
  @observable
  currentUser?: string;

  @observable
  currentRole?: string;

  @action
  fetchCurrentUser() {
    this.currentUser = sessionStorage.getItem("userName") || "";
    if (!this.currentUser) {
      history.push("/login");
    }
  }

  @action
  fetchCurrentRole() {
    this.currentRole = sessionStorage.getItem("role") || "";
  }
}

export default Global;
