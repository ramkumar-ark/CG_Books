
export default class ContactController {
    constructor(ContactModel){
        this.model = ContactModel;
    }

    async create({salutation, firstName, lastName, email, workPhone, mobile}){
        try {
            if (salutation && firstName){
                lastName = lastName || null;
                email = email || null;
                workPhone = workPhone || null;
                mobile = mobile || null;
                const contact = await this.model.create({salutation, firstName, lastName, email, workPhone, mobile});
                return Promise.resolve(contact.id);
            }else{
                return Promise.reject('To create a contact, Salutation and first name are required.')
            }
        } catch (error) {
            return Promise.reject(error);           
        }
    }

    async delete(id){
        try {
            await this.model.deleteOne({"_id": id});
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
