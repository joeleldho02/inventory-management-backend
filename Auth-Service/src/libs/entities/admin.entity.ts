import { ROLES } from "../../utils/roles.list";

export default class AdminEntity{
    public name? : string;
    public email? : string;
    public password? : string;
    public roles? : Array<ROLES>;
    public updatedOn? : Date;

    constructor (obj:any){        
        Object.assign(this, obj)
    }
}