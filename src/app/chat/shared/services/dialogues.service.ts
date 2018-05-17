import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApi } from "../../../shared/core/base-api";
import { Observable } from "rxjs/Observable";
import { Dialogue } from "../models/dialogue";

@Injectable()
export class DialoguesService extends BaseApi {

    constructor(public http: HttpClient) {
        super(http);
    }

    //get all dialogues of first and second user, then in component find common dialogue if exist
    getDialoguesByUsersId(firstUserId, secondUserId): Observable<any> {
        return this.get(`bindDialoguesToUser?userID=${firstUserId}&userID=${secondUserId}`);
    }

    getDialogueById(id): Observable<Dialogue> {
        return this.get(`dialogues/${id}`);
    }

    sendMessage(dialogueID, dialogue): Observable<any> {
        return this.put(`dialogues/${dialogueID}`, dialogue)
    }

    getAllBindDesc(): Observable<any> {
        return this.get('bindDialoguesToUser?_sort=dialogueID&_order=desc')
    }

    createNewBind(newBind): Observable<any> {
        return this.post('bindDialoguesToUser', newBind);
    }

    createNewDialogue(newDialogue): Observable<any> {
        return this.post('dialogues', newDialogue);
    }

    changeWatchedStatus(dialogue): Observable<any> {
        return this.put('dialogues');
    }

    getAllUserDialogues(id): Observable<any> {
        return this.get(`bindDialoguesToUser?userID=${id}`);
    }

}