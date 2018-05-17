import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { User } from '../../shared/models/user.model';
import { DialoguesService } from '../shared/services/dialogues.service';
import { UsersService } from '../../shared/services/users.service';
import { Dialogue } from '../shared/models/dialogue';

@Component({
  selector: 'app-dialogues',
  templateUrl: './dialogues.component.html',
  styleUrls: ['./dialogues.component.less']
})
export class DialoguesComponent implements OnInit {

  constructor(private dialoguesService: DialoguesService,
    private usersService: UsersService,
    private router: Router) { }

  private mainUser: User;
  private newArrayOfMessages = [];

  ngOnInit() {
    let secondUserName: string = '';
    let secondUserId;
    let unreadMessages: number = 0;
    this.mainUser = JSON.parse(window.localStorage.getItem('user'));
    let stream = this.dialoguesService.getAllUserDialogues(this.mainUser.id)
      .subscribe(binds => {
        console.log(binds);
        binds.map(bind=>{
          this.dialoguesService.getDialogueById(bind.dialogueID)
            .subscribe((dialogue: Dialogue) =>{
              console.log(dialogue);
              
            })
        })
          

      })
    // stream.subscribe((data) => {
    //   console.log(data);
    // })

    // this.dialoguesService.getAllUserDialogues(this.mainUser.id)
    //   .map((bind) => {
    //     console.log(bind);
    //     return this.dialoguesService.getDialogueById(bind.dialogueID)
    //       .map((dialogue: Dialogue)=>{
    //         console.log(dialogue);
    //       })
    //       .subscribe()
    //   })
    //   .subscribe()


    // this.dialoguesService.getAllUserDialogues(this.mainUser.id)
    //   .subscribe((binds) => {
    //     console.log(binds);
    //     for (let bind of binds) {
    //       return this.dialoguesService.getDialogueById(bind.dialogueID)
    //         .subscribe((dialogue: Dialogue) => {
    //           //console.log(dialogue)
    //           for (let message of dialogue.messages) {
    //             if (message.senderID !== this.mainUser.id) {
    //               if (message.watched === false) {
    //                 unreadMessages += 1;
    //               }
    //               this.usersService.getUserById(message.senderID)
    //                 .subscribe((user: User) => {
    //                   secondUserName = user.name;
    //                   secondUserId = user.id;
    //                   let lastMessage = dialogue.messages.reverse()[0];
    //                   this.newArrayOfMessages.push({ "name": secondUserName, "text": lastMessage.text, "time": lastMessage.time, "id": secondUserId, "unreadMessage": unreadMessages })
    //                   unreadMessages = 0;
    //                   return;
    //                 })
    //             }
    //           }
    //         })
    //     }
    //   })
  }

  onClickDialogue(secondId, secondUserName) {
    let lastBindId: number;
    this.dialoguesService.getDialoguesByUsersId(this.mainUser.id, secondId)
      .subscribe((data) => {
        let commonDialogue = this.findCommonDialogue(data);
        if (commonDialogue) {
          this.router.navigate(['chat/dialogue', commonDialogue, { secondUserName }]);
        } else {
          this.createNewDialogue(secondId, secondUserName);
        };
      })
  }

  createNewDialogue(secondId, secondUserName) {
    let lastBindId
    this.dialoguesService.getAllBindDesc()
      .subscribe((data) => {
        lastBindId = data[0].dialogueID + 1;
        Observable.combineLatest(
          this.dialoguesService.createNewBind({ userID: this.mainUser.id, dialogueID: lastBindId }),
          this.dialoguesService.createNewBind({ userID: secondId, dialogueID: lastBindId }),
          this.dialoguesService.createNewDialogue({ messages: [] }))
          .subscribe(() => {
            console.log('done');
            this.router.navigate(['chat/dialogue', lastBindId, { secondUserName }])
          })
      });
  }

  private findCommonDialogue(data) {
    for (let i of data) {
      let tempFirstUserID = i.userID;
      let tempDialogue = i.dialogueID;
      for (let j of data) {
        if (j.userID === tempFirstUserID) {
          continue;
        } else if (j.dialogueID === tempDialogue) {
          return j.dialogueID;
        }
      }
    }
  }

}
