import { Component, OnInit } from '@angular/core';

import { DialoguesService } from '../../services/dialogues.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  mainUser: User;
  uncheckedMessages: number = 0;

  constructor(private dialoguesService: DialoguesService) { }

  ngOnInit() {
    this.mainUser = JSON.parse(window.localStorage.getItem('user'));
    this.dialoguesService.getAllUserDialogues(this.mainUser.id)
      .subscribe((binds) => {
        for (let bind of binds) {
          this.dialoguesService.getDialogueById(bind.dialogueID)
            .subscribe((dialogue) => {
              for (let message of dialogue.messages) {
                if (message.senderID !== this.mainUser.id) {
                  if (message.watched === false) {
                    this.uncheckedMessages += 1;
                  }
                }
              }
            })
        }
      })
  }

}
