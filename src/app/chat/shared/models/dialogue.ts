import { userMessage } from "./userMessage";

export class Dialogue{
    constructor(
        public messages: userMessage[],
        public id: number
    ){}
}