import { observable, action } from "mobx";
import { history } from "../App";
import { ProMenuType } from "../menu";

class Global {
  constructor() {
    this.breadCrumb = [];
  }
  @observable
  currentUser?: string;

  @observable
  currentRole?: string;

  @observable
  breadCrumb: ProMenuType[];

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

  //通过路径匹配根路径，高亮根路径
  @action
  matchPath(path: string, dataSource: ProMenuType[]) {
    let result;
    dataSource.forEach((item) => {
      if (item.routes) {
        this.matchPath(path, item.routes);
      }
      if (path === item.path) {
        result = item.path;
      } else {
        let arr = path.split(item.path);
        if (arr[1]) {
          result = item.path;
        }
      }
    });
    return result;
  }

  //生成面包屑
  @action
  fetchBreadCrumb(urlArr: string[], dataSource: ProMenuType[]) {
    dataSource.forEach((item): void => {
      urlArr.forEach((url): void => {
        //如果this.breadCrumb中没有当前对象
        if (!this.hasBreadCrumb(item.path)) {
          if (item.path === url) {
            this.breadCrumb.push(item);
          }
          //如果是动态匹配路由
          if (this.isActiveRoute(item.path, url)) {
            this.breadCrumb.push(item);
          }
        }
        if (item.routes) {
          this.fetchBreadCrumb(urlArr, item.routes);
        }
      });
    });
  }
  hasBreadCrumb(url: string) {
    return this.breadCrumb.filter((item) => item.path === url).length > 0
      ? true
      : false;
  }
  isActiveRoute(activePath: string, path: string) {
    if (
      activePath.includes(":") &&
      activePath.split("/").length === path.split("/").length
    ) {
      return true;
    }
  }
}

export default Global;
