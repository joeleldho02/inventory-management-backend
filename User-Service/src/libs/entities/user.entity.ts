import { ROLES } from "../../utils/roles.list";

export default class UserEntity{
    public _id? : string;
    public name? : string;
    public email? : string;
    public mobile? : string;
    public roles? : Array<ROLES>;
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