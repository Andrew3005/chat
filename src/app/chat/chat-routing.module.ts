import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChatComponent } from "./chat.component";
import { AllUsersComponent } from "./all-users/all-users.component";
import { MyPageComponent } from "./my-page/my-page.component";
import { MailComponent } from "./mail/mail.component";
import { DialoguesComponent } from "./dialogues/dialogues.component";
import { DialogueComponent } from "./dialogue/dialogue.component";

const routes: Routes = [
    {
        path: 'chat', component: ChatComponent, children: [
            { path: 'all-users', component: AllUsersComponent },
            { path: 'dialogues', component: DialoguesComponent },
            { path: 'dialogue/:id', component: DialogueComponent },
            { path: 'mail', component: MailComponent },
            { path: 'my-page', component: MyPageComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ChatRoutingModule { }