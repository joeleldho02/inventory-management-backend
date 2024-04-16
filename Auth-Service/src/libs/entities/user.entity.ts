export default class UserEntity{
    public userId? : string;
    public name? : string;
    public email? : string;
    public password? : string;
    public isActive? : boolean;
    public updatedOn? : Date;

    constructor (obj: any){        
        Object.assign(this, obj)
    }
}