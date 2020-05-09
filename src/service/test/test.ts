import request from "../../utils/request";
import { apiHost } from ".";

export interface Params {
  id: number;
}

export interface DataList {
  id: number;
  name: string;
  //数字索引
  //[index: number]: number;
  //字符串索引
  //[key: string]: string;
}

export const getData = (params: Params) =>
  request.get<{ dataList: DataList[] }>(`${apiHost}/exactPath`, { params });

export const addNewData = (params: Params) =>
  request.post<{}>(`${apiHost}/exactPath`, params);

export const getBossReleaseNews = () =>
  request.get<{ dataList: DataList[] }>(`/getBossReleaseNews`);
