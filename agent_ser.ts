import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agent } from './agent';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private admin: Admin;
  private flag: boolean;

  constructor(private _http: HttpClient) {}

  getAgent() {
    return this._http.get('http://127.0.0.1:3000/getagent', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json'),
    });
  }

  saveAgent(body: any) {
    return this._http.post('http://127.0.0.1:3000/saveagent', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json'),
    });
  }

  updateAgent(body: any) {
    return this._http.put('http://127.0.0.1:3000/updateagent', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json'),
    });
  }

  deleteAgent(emailId: string) {
    return this._http.post(
      'http://127.0.0.1:3000/deleteagent',
      { emailId },
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-type', 'application/json'),
      }
    );
  }

  setter(admin: Admin) {
    this.admin = admin;
  }

  getter(): Admin {
    return this.admin;
  }

  editsetter(flag: boolean) {
    this.flag = flag;
  }

  editgetter(): boolean {
    return this.flag;
  }
}
