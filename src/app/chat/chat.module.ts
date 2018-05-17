import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";


import { ChatComponent } from "./chat.component";
import { AllUsersComponent } from "./all-users/all-users.component";
import { MailComponent } from "./mail/mail.component";
import { DialoguesComponent } from "./dialogues/dialogues.component";
import { MyPageComponent } from "./my-page/my-page.component";
import { ChatRoutingModule } from "./chat-routing.module";
import { HeaderComponent } from "./shared/components/header/header.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { DropDownDirective } from "./shared/directives/dropdown.directive";
import { FilterPipe } from "./shared/pipes/filter.pipe";
import { DialogueComponent } from './dialogue/dialogue.component';
import { DialoguesService } from "./shared/services/dialogues.service";
import { textLengthPipe } from "./shared/pipes/textLength.pipe";

@NgModule({
    imports:[
        SharedModule,
        ChatRoutingModule,
        CommonModule
    ],
    declarations: [
        ChatComponent,
        AllUsersComponent,
        DialoguesComponent,
        MailComponent,
        MyPageComponent,
        HeaderComponent,
        SidebarComponent,
        DropDownDirective,
        FilterPipe,
        DialogueComponent,
        textLengthPipe
    ],
    providers: [DialoguesService]
})
export class ChatModule{}