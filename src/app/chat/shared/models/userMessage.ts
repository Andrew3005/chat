export class userMessage{
    constructor(
        public senderID: number,
        public text: string,
        public time: string,
        public watched: boolean
    ){}
}