import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { DialoguesService } from '../shared/services/dialogues.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.less']
})
export class AllUsersComponent implements OnInit {

  constructor(private usersService: UsersService,
    private dialoguesService: DialoguesService,
    private router: Router) { }

  users: User[] = [];
  mainUser: User = JSON.parse(window.localStorage.getItem('user'));

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe((users: User[]) => {
        let mainUser = JSON.parse(window.localStorage.getItem('user'));
        this.users = users.filter(u => u.id !== mainUser.id);
      })
  }

  searchPlaceholder = "Ім'я";
  searchField = 'name';
  searchValue = '';

  changeCriteria(field: string) {
    const namesMap = {
      name: "Ім'я",
      position: "Посада"
    }
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

  private onClickWriteMessage(secondId, secondUserName) {
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


