import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UtilitiesService} from "./utilities.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Chat} from "../models/chat";
import {ChatRoom} from "../models/chat-room";
import {User} from "../models/user";
import {UserService} from "./user.service";
import {ChatMessage} from "../models/chat-message";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = this.utilitiesService.getApiUrl();
  chatBaserUrl = this.baseUrl + '/rooms';
  public chatRelatedUsers$: BehaviorSubject<any> = new BehaviorSubject({});
  public chatRelatedMessages$: Subject<any> = new Subject();
  public applicationChats$: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private utilitiesService: UtilitiesService,
    private userService: UserService
  ) {}

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.chatBaserUrl);
  }

  updateChatRelatedUsers(chatId: number) {
    const chatRelatedUsers = [];
    this.getChatRelatedUsers(chatId).subscribe((data: any) => {
      this.userService.getUsers().subscribe(users => {
        data.users.forEach(chatRelatedUserId => {
          chatRelatedUsers.push(users.find(user => user.id === chatRelatedUserId));
        })
      })
      this.chatRelatedUsers$.next(chatRelatedUsers);
    })
  }


  getChatRoom(id: number): Observable<ChatRoom> {
    const chatRoomUrl = `${this.chatBaserUrl}/${id}`;
    return this.http.get<ChatRoom>(chatRoomUrl);
  }

  createChatRoom(newChatName: string): Observable<ChatRoom> {
    return this.http.post<any>(this.chatBaserUrl, {
      name: newChatName
    });
  }

  joinChat(chatId: number, userId: number): Observable<any> {
    let url = `${this.chatBaserUrl}/${chatId}/users`;
    return this.http.post<any>(url, {
      userId: userId
    });
  }

  getChatRelatedUsers(chatId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.chatBaserUrl}/${chatId}/users`);
  }

  removeUserFromChat(chatId: number, userId: number): Observable<User> {
    let url = `${this.chatBaserUrl}/${chatId}/users/${userId}`
    return this.http.delete<User>(url);
  }

  getChatRelatedMessages(chatId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.chatBaserUrl}/${chatId}/text`);
  }

  updateChatRelatedMessages(chatId: number) {
    this.getChatRelatedMessages(chatId).subscribe(data => {
      this.chatRelatedMessages$.next(data);
    })
  }

  updatedApplicationChatList() {
    this.getChats().subscribe(data => {
      this.applicationChats$.next(data);
    })
  }

  sendMessageToTheChat(chatId: number, message: ChatMessage): Observable<any> {
    let url = `${this.chatBaserUrl}/${chatId}/text`;
    return this.http.post<any>(url, message);
  }
}
