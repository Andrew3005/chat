export class User{
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public position: string,
        public id?: number
    ){}
}