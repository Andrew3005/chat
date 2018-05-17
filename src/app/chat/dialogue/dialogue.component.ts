import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

import { DialoguesService } from '../shared/services/dialogues.service';
import { Dialogue } from '../shared/models/dialogue';
import { userMessage } from '../shared/models/userMessage';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.less']
})
export class DialogueComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private dialoguesService: DialoguesService,
    private usersService: UsersService) { };

  messages: userMessage[] = [];
  mainUser;
  userName;
  secondUserName;
  form: FormGroup
  dialogue: Dialogue;


  ngOnInit() {
    this.mainUser = JSON.parse(window.localStorage.getItem('user'));
    this.userName = this.mainUser.name;
    this.route.params
      .subscribe((params: Params) => {       
        this.secondUserName = params['secondUserName']
        this.dialoguesService.getDialogueById(params.id)
          .subscribe((dialogue: Dialogue) => {
            this.dialogue = dialogue;
            this.messages = dialogue['messages']
            for (let message of this.messages) {
              if(message.senderID !== this.mainUser.id){
                if (message.watched === false){
                  message.watched = true;
                }
             }
            }
          })
      })

    this.form = new FormGroup({
      messageText: new FormControl('', [Validators.required])
    })
  }

  onSendMessage() {
    const time = moment().format('HH:mm DD.MM');
    const messageText = this.form.value['messageText'];
    this.dialogue['messages'].push({ "senderID": this.mainUser.id, "text": messageText, "time": time, "watched": false });
    this.dialoguesService.sendMessage(this.dialogue['id'], this.dialogue)
      .subscribe();
    this.form.setValue({
      messageText: ''
    })
  }

}
