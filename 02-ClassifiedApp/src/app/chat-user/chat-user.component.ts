import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ChatDetails, ChatInsert, ChatList } from '../_models/chat-model';
import { AuthenticationService } from '../_services/authentication.service';
import { ChatService } from '../_services/chat.service';

declare var scrollToBottomFunction: any;


@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css'],
})
export class ChatUserComponent implements OnInit {
  txtChat: string;
  chatList: ChatList;
  chatDetail: ChatDetails;

  //TODO ADNAN
  //Replace it with loggedInUser's ID
  loggedInUserId: string = '';
  prodId: string;
  receiverId: string;
  activatedChatSessionID: string = "";


  constructor(
    private _chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private socket: Socket,
    private _authService: AuthenticationService
  ) {}

  ngAfterViewChecked(){
      let scrollDiv = (<HTMLInputElement>document.getElementById('scrollDiv'));        
      scrollDiv.scroll({ top: scrollDiv.scrollHeight, behavior: 'smooth' });    
  }
  ngOnInit(): void {
    
    ///SOCKET IO TO UPDATE CHAT
    this.socket.on('clientChatUpdate', data => {
      
      this.getChatList();      
    })
    ///////////////////////////
    
    
    this.activatedRoute.paramMap.subscribe((x) => {
      //TODO uncomment it after setting in the detail page:
      this.prodId = x.get('prodId') || '';
      this.receiverId = x.get('rec') || '';

      //alert(this.prodId);
      //this.prodId = '';
      //this.receiverId = '';

      let loggedInUser = this._authService.currentUser;


      console.log(loggedInUser);
        
      this.loggedInUserId = loggedInUser.user.id.toString();

      if(this.prodId != '' && this.receiverId != ''){
        this._chatService
        .checkAndInsertChatSession(
          this.prodId,
          this.loggedInUserId,
          this.receiverId
        )
        .subscribe((data) => {
          
          if(data.chat){
              //Got a new Chat Session OR get old one if exists, check by stored procedure
              //Stored Procedure Name: CheckAndInsertChatSession
              this.activatedChatSessionID = data.chat[0].chatSessionId;
              
          }            

          this.getChatList();


              //SOCKET IO
              this.socket.emit('updateChat', '');
              ///////////////////////

        });
        
      }
      else{
        //Get list and activated first chat
        this.getChatList();

      }
      

     
      
 

    });


  }

  getChatList() {
    //TODO ADNAN    
    
    this._chatService.getChatList(this.loggedInUserId).subscribe((data) => {

      this.chatList = data;

      if (data) {
        //Activate First
        //let chatId = data.chat.filter((m) => m.ProductID == this.prodId)[0].id;        
        if(this.activatedChatSessionID == '' && data.chat[0]){          
          this.activatedChatSessionID = data.chat[0].id;
        }

        if(data.chat[0])
        this.getChatDetail(this.activatedChatSessionID);          
      }
    });
  }

  sendChat() {

    if (this.txtChat && this.txtChat.trim()) {
      let chatObj = {} as ChatInsert;
      chatObj.message = this.txtChat.trim();
      chatObj.receiverId = this.chatDetail.chat[0].ReceiverID == this.loggedInUserId ? this.chatDetail.chat[0].SenderID : this.chatDetail.chat[0].ReceiverID;
      chatObj.senderId = this.loggedInUserId;
      chatObj.chatSessionID = this.chatDetail.chat[0].chatSessionID;

      this._chatService.insertChat(chatObj).subscribe((data) => {
        this.txtChat = '';


        //SOCKET IO
        this.socket.emit('updateChat', '');
        ///////////////////////

        
      
      });
    }
  }


  getChatDetail(chatSessionId) {
    this.activatedChatSessionID = chatSessionId;
    //console.log(chatSessionId);
    //TODO ADNAN
    //set loggedInUser
    this._chatService
      .getChatHistoryById(chatSessionId, this.loggedInUserId)
      .subscribe((data) => {
        this.chatDetail = data;

        this._chatService.updateReadBit(chatSessionId, this.loggedInUserId).subscribe(data=>{
          this._chatService.getNotification(this.loggedInUserId);
        })

      });
    return false;
  }
}
