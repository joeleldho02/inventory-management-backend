export default class AdminEntity{
    public name? : string;
    public email? : string;
    public password? : string;
    public updatedOn? : Date;

    constructor (obj){        
        Object.assign(this, obj)
    }
}