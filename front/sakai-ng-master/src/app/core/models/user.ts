
export class User {
    constructor(
        public username?: string,
        public email?: string,
        public lastname?: string,
        public name?: string,
        public id?: string,
        public bio?: string,
        public password?: string,
        public roles?: string,
        public avatarUrl?: string,
        public enabled?: boolean,
        public createdAt?:Date,
        public updatedAt?:Date,
        public direction?: string,
        public phone?: string,
        public website?: string,
        public account:any[] = [],
    ){}
}
