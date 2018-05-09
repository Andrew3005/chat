import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  constructor(private title: Title) {
    title.setTitle('Effectiveness Network');
   }

  ngOnInit() {
  }

}
