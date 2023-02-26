

export default class EntityController{
    constructor(EntityModel){
        this.model = EntityModel;
    }

    async create({
        name,
        companyName,
        website,
        pan,
        creditPeriod,
        addressIds,
        contactIds,
        primaryContactId,
        bankDetailsId,
        remarks,
        type,
        ledgerId,
        userId,
    }){
        try {
            if (!(name && type && userId && ledgerId))

                return Promise.reject("Values not provided: 'name', 'type', 'userId' or 'ledgerId'"); 
            if (!(['customer', 'vendor'].includes(type))) 
                return Promise.reject("Invalid value for 'type'");
            const addresses = addressIds || [];
            const contacts = contactIds || [];
            let entityDetails = {
                name, type, createdBy: userId, ledger: ledgerId, addresses, contacts
            };
            const primaryContact = primaryContactId || undefined;
            const bankDetails = bankDetailsId || undefined;
            for (const [key, value] of Object.entries({
                companyName: companyName, website: website, pan: pan, creditPeriod: creditPeriod, 
                remarks: remarks, primaryContact: primaryContact, bankDetails: bankDetails
            })){
                if (value) entityDetails[key] = value;    
            }
            const entity = await this.model.create(entityDetails);
            return Promise.resolve(entity.id);
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async fetchCustomers(){
        try {
            const entityDocs = await this.model.find({type:"customer"}).exec();
            return Promise.resolve(entityDocs);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
