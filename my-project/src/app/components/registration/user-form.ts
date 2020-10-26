export class UserForm {
    constructor(
        public userId: number,
        public email: string,
        public password: number,
        public passwordConfirm: number,
        public userName: string,
        public lastName: string,
        public street: string,
        public city: string
    ) { }
}
