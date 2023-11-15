import { chatDao } from "../dao/index.js";


export class ChatService {

    static getmessages(){
        return chatDao.getMessages()
    }
    static createMessge(messageInfo){
        return chatDao.createMessage(messageInfo)
    }
}