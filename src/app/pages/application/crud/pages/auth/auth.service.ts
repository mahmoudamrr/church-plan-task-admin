import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.config.url;

  login(email: string, password: string): Promise<void> {
    const loginData = {
      email: email,
      password: password,
    };

    return axios.post(`${this.apiUrl}auth/login`, loginData);
  }

  logout(): Promise<void> {
    return axios.post(`${this.apiUrl}auth/logout`);
  }

  register(username: string, email: string, password: string): Promise<void> {
    const data = {
      username: username,
      email: email,
      password: password,
    };

    return axios.post(`${this.apiUrl}auth/register`, data);
  }
}
