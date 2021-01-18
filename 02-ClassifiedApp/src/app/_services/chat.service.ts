import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ChatDetails,
  ChatInsert,
  ChatList,
  ChatNotification,
  CheckAndInsertChatSession,
} from '../_models/chat-model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = environment.apiUrl;
  chatNotification = new BehaviorSubject<ChatNotification>(
    {} as ChatNotification
  );

  constructor(private http: HttpClient) {}

  public getChatHistoryById(
    chatSessionId: string,
    loggedInUserId: string
  ): Observable<ChatDetails> {
    const params = new HttpParams()
      .set('chatSessionId', chatSessionId)
      .set('loggedInUserId', loggedInUserId);

    return this.http.get<ChatDetails>(
      this.baseUrl + '/chat/getChatHistoryById',
      { params }
    );
  }

  public getChatList(receiverId: string): Observable<ChatList> {
    const params = new HttpParams().set('receiverId', receiverId);

    return this.http.get<ChatList>(this.baseUrl + '/chat/getChatList', {
      params,
    });
  }

  public checkAndInsertChatSession(
    productId: string,
    senderId: string,
    receiverId: string
  ): Observable<CheckAndInsertChatSession> {
    const params = new HttpParams()
      .set('productId', productId)
      .set('senderId', senderId)
      .set('receiverId', receiverId);

    return this.http.get<CheckAndInsertChatSession>(
      this.baseUrl + '/chat/checkAndInsertChatSession',
      { params }
    );
  }

  public updateReadBit(
    chatSessionID: string,
    receiverId: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('chatSessionID', chatSessionID)
      .set('receiverId', receiverId);

    return this.http.get<any>(this.baseUrl + '/chat/updateReadBit', { params });
  }

  public getNotification(receiverId: string) {
    const params = new HttpParams().set('receiverId', receiverId);

    this.http
      .get<ChatNotification>(this.baseUrl + '/chat/getNotification', { params })
      .subscribe((data) => {
        this.chatNotification.next(data);
      });
  }

  public insertChat(chatObj: ChatInsert): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/chat/insertChat', chatObj);
  }
}
