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
/**
 * @class
 * Main Chat related Application service
 */
export class ChatService {
  // Dynamically identifies the Application base URL for communication with a server
  baseUrl = this.utilitiesService.getApiUrl();
  // Base REST API route related to the User entity
  chatBaserUrl = this.baseUrl + '/rooms';
  /**
   * RxJS Behavior Subject which is responsible for managing the users which are related to some particular chat
   * @public - allows to make the changes to the subject directly from the component where it is being used
   */
  public chatRelatedUsers$: BehaviorSubject<any> = new BehaviorSubject({});
  /**
   * RxJS Behavior Subject which is responsible for managing the messages which are related to some particular chat
   * @public - allows to make the changes to the subject directly from the component where it is being used
   */
  public chatRelatedMessages$: Subject<any> = new Subject();
  /**
   * RxJS Behavior Subject which is responsible for managing all Application chats
   * @public - allows to make the changes to the subject directly from the component where it is being used
   */
  public applicationChats$: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private utilitiesService: UtilitiesService,
    private userService: UserService
  ) {}

  /**
   * Fetches all the Application chats
   * @HTTPRequestType GET
   */
  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.chatBaserUrl);
  }

  /**
   * Fetches the particular Chat room from backend
   * @param id {number} - chat room ID
   * @HTTPRequestType GET
   */
  getChatRoom(id: number): Observable<ChatRoom> {
    const chatRoomUrl = `${this.chatBaserUrl}/${id}`;
    return this.http.get<ChatRoom>(chatRoomUrl);
  }

  /**
   * Creates the new Chat Room
   * @param newChatName {string} - the new Chat Room name
   * @HTTPRequestType POST
   */
  createChatRoom(newChatName: string): Observable<ChatRoom> {
    return this.http.post<any>(this.chatBaserUrl, {
      name: newChatName
    });
  }

  /**
   * Fetches all the users which are related to the particular chat
   * @param chatId {number} - chat ID
   * @HTTPRequestType GET
   */
  getChatRelatedUsers(chatId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.chatBaserUrl}/${chatId}/users`);
  }


  /**
   * 1. Fetches all the users which are participating particular chat
   * 2. Fetches all the Chat environment users
   * 3. Maps the data between #1 and #2 - this is needed for the proper UI data displaying
   *    in the chat component. Backend data format provides the list of chat users with user ID and user text,
   *    however, in UI, user should see other user's names, not IDs
   * 4. Notifies the RxJS subject to trigger the component subscription and re-fetch the data needed for UI
   * @param chatId {number} - chat room ID
   * @HTTPRequestType GET
   */
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

  /**
   * Removes the User from particular Chat Room
   * @param chatId {number} Chat Room ID
   * @param userId {number} User ID
   * @HTTPRequestType DELETE
   */
  removeUserFromChat(chatId: number, userId: number): Observable<User> {
    let url = `${this.chatBaserUrl}/${chatId}/users/${userId}`
    return this.http.delete<User>(url);
  }

  /**
   * Send message to the chat
   * @param chatId {number} Chat Room ID
   * @param message {string} User message
   * @HTTPRequestType POST
   */
  sendMessageToTheChat(chatId: number, message: ChatMessage): Observable<any> {
    let url = `${this.chatBaserUrl}/${chatId}/text`;
    return this.http.post<any>(url, message);
  }

  /**
   * Assign the User to the particular chat
   * @param chatId {number} - Chat Room ID
   * @param userId {number} - User ID
   * @HTTPRequestType POST
   */
  joinChat(chatId: number, userId: number): Observable<any> {
    let url = `${this.chatBaserUrl}/${chatId}/users`;
    return this.http.post<any>(url, {
      userId: userId
    });
  }

  /**
   * Fetches all the messages related to the particular chat
   * @param chatId {number} - Chat Room ID
   * @HTTPRequestType GET
   */
  getChatRelatedMessages(chatId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.chatBaserUrl}/${chatId}/text`);
  }

  /**
   * Notifies the RxJS Subject stream observer that new message has been sent to the chat.
   * Needed for letting the component know that data should be re-fetched
   * @param chatId {number} - Chat Room ID
   */
  updateChatRelatedMessages(chatId: number) {
    this.getChatRelatedMessages(chatId).subscribe(data => {
      this.chatRelatedMessages$.next(data);
    })
  }

  /**
   * Notifies the RxJS Subject stream observer that new Application chat has been created.
   * Needed for letting the component know that data should be re-fetched
   */
  updatedApplicationChatList() {
    this.getChats().subscribe(data => {
      this.applicationChats$.next(data);
    })
  }
}
