import { ROLES } from "../../utils/roles.list";

export default class UserEntity{
    public _id? : string;
    public name? : string;
    public email? : string;
    public password? : string;
    public isActive? : boolean;
    public roles? : Array<ROLES>;
    public createdBy? : string;
    public createdOn? : Date;
    public updatedBy? : string;    
    public updatedOn? : Date;

    constructor (obj: any){        
        Object.assign(this, obj)
    }
}