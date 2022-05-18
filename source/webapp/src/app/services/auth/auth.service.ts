import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    //activate authguard localStorage.getItem('id')
    //deactivate authguard !!localStorage.getItem('id')
    return localStorage.getItem('id')
  }
}
