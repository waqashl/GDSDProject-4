export interface ChatList {
    status: string;
    chat: ChatListDetail[];
}
export interface ChatListDetail{
    id: string;
    user1ID: string;
    user2ID: string;
    ProductName: string;
    ProductID: string;    
    topMessage: string;
    opponentUserName: string;
}

export interface ChatDetails {
    status: string;
    chat: ChatDetailsDetails[];  
}

export interface ChatDetailsDetails
{  
    id: string;
    Message: string;
    Date: Date;
    SenderID: string;    
    ReceiverID: string;
    chatSessionID: string;
    isRead:boolean;
    opponentUserName: string;
    myName: string;
    ProductID: string;

}

export interface ChatInsert {
    message: string;
    senderId: string;
    receiverId: string;
    chatSessionID: string;
}

export interface CheckAndInsertChatSession{
    status: string;
    chat: CheckAndInsertChatSessionDetail[];  
}


export interface CheckAndInsertChatSessionDetail{
    chatSessionId: string;
}
