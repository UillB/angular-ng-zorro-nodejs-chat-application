import {Injectable} from '@angular/core';
import {UtilitiesService} from "./utilities.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
/**
 * @class
 * Service which is responsible for fetching the backend data
 * related to the Application User entity
 */
export class UserService {
  // Dynamically identifies the Application base URL for communication with a server
  baseUrl = this.utilitiesService.getApiUrl();
  // Base REST API route related to the User entity
  usersBaseUrl = this.baseUrl + '/users';

  constructor(
    private http: HttpClient,
    private utilitiesService: UtilitiesService
  ) {
  }

  /**
   * Executes HTTP GET request in order to fetch the users
   * from backend
   * @HTTPRequestType GET
   */
  getUsers(): Observable<User[]> {
    this.http.get<User[]>(this.usersBaseUrl).subscribe(data => {
      console.log('All users:', data)
    });
    return this.http.get<User[]>(this.usersBaseUrl);
  }

  /**
   * Executes HTTP POST request in order to
   * create the new Application User
   * @param user {User}
   * @HTTPRequestType POST
   */
  registerUser(user: User): Observable<any> {
    return this.http.post<User>(this.usersBaseUrl, user);
  }
}
