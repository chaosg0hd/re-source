import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConnStatus } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

 ConnStatus: any[] = [];

  //SERVICES FOR DATA  

  baseURL = "http://localhost:3000";

  //General Methods

  get(uri: string) {
    return this.http.get(`${this.baseURL}/api/${uri}`);
  }

  post(uri: string, payload: object) {
    return this.http.post(`${this.baseURL}/api/${uri}`, payload);
  }

  put(uri: string, payload: object) {
    return this.http.put(`${this.baseURL}/api/${uri}`, payload);
  }

  patch(uri: string, payload: object) {
    return this.http.patch(`${this.baseURL}/api/${uri}`, payload);
  }

  delete(uri: string, payload: object) {
    return this.http.patch(`${this.baseURL}/api/${uri}`, payload);
  }

  //Data Methods

  //checkLogin(uri: any, data: any) {  
  //  return this.post(uri, { data });
  //}

  //signUp(uri: any, data: any) {
  //  return this.post(uri, { data });
  //}

  //editEmp(uri: any, data: any) {
  //  return this.post(uri, { data });
  //}

  //getTime(uri: any) {
  //  return this.get(uri);
  //}

  //timeIn(uri: any, data: any) {
  //  return this.post(uri, { data });
  //}

  //timeOut(uri: any, data: any) {
  //  return this.post(uri, { data });
  //}

  //checkTime(uri: any, id: any) {
  //  return this.get(`${uri}/${id}`);
  //}

  //addTime(uri: any, data: any) {
  //  return this.post(uri, { data });
  //}  

  //getAttendance(uri: any) {
  //  return this.get(uri);
  //}

  //editAttendance(uri: any, data: any) {
  //  return this.post(uri, { data });
  //}

  //addPayroll(uri: any, data: any) {
  //  return this.post(uri, { data });
  //}

  //getPayroll(uri: any) {
  //  return this.get(uri);
  //}

  ////addPayroll(uri: any, data: any) {
  ////  return this.post(uri, { data });
  ////}








  //getAllItem(uri: any) {
  //  return this.get(uri);
  //}

  

  //createItem(uri: any, data: any) {
  //  return this.post(uri, { data });
  //}

  //createItemss = async (uri: any, data: any) => {
  //  const response: any = await this.post(uri, { data }).toPromise();
  //  return response;
  //}

  //createItemInv(uri: any, data: any, file: any) {
  //  return this.post(uri, { data, file });
  //}

  //getItem(uri: any, id: any) {
  //  return this.get(`${uri}/${id}`);
  //}

  //updateItem(uri: any, id: any, data: any) {
  //  return this.put(`${uri}/${id}`, { data })
  //}

  //archiveItem(uri: any, id: any, data: any) {
  //  return this.patch(`${uri}/${id}`, { data });
  //}

}
