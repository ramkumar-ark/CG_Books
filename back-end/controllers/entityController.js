

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
        customerType,
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
                remarks: remarks, primaryContact: primaryContact, bankDetails: bankDetails, customerType,
            })){
                if (value) entityDetails[key] = value;    
            }
            const entity = await this.model.create(entityDetails);
            return Promise.resolve(entity.id);
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update({
        entityId,
        name,
        companyName,
        website,
        pan,
        creditPeriod,
        addressIds,
        contactIds,
        remarks,
        type,
        customerType,
        userId,
    }){
        try {
            if (!(name && type && userId))
                return Promise.reject("Values not provided: 'name', 'type', 'userId'"); 
            if (!(['customer', 'vendor'].includes(type))) 
                return Promise.reject("Invalid value for 'type'");
            const addresses = addressIds || [];
            const contacts = contactIds || [];
            let entityDetails = {
                name, type, updatedBy: userId, addresses, contacts, lastUpdatedOn: Date.now(),
            };
            for (const [key, value] of Object.entries({
                companyName: companyName, website: website, pan: pan, creditPeriod: creditPeriod, 
                remarks: remarks, customerType,
                })){
                if (value) entityDetails[key] = value;
            }
            const entity = await this.model.findByIdAndUpdate(entityId, entityDetails, {new:true});
            console.log(entity);
            return Promise.resolve(entity);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getEntity(id){
        try {
            const entity = await this.model.findById(id).exec();
            return Promise.resolve(entity);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async fetchCustomers(){
        try {
            const entityDocs = await this.model.find({type:"customer"})
                .populate('addresses')
                .populate('contacts')
                .populate('primaryContact')
                .populate('bankDetails')
                .populate('ledger');
            return Promise.resolve(entityDocs);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
