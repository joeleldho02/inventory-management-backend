export default class UserEntity{
    public userId? : string;
    public name? : string;
    public email? : string;
    public mobile? : string;
    public role? : string;
    public outlet? : string;
    public password? : string;
    public isActive? : boolean;
    public createdOn? : Date;
    public createdBy? : string;
    public updatedOn? : Date;
    public updatedBy? : string;

    constructor (obj){        
        Object.assign(this, obj)
    }
}