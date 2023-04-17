

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
        otherDetailsId,
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
                otherDetails:otherDetailsId,
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
            return Promise.resolve(entity);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getEntity(id){
        try {
            const entity = await this.model.findById(id)
                .populate('addresses')
                .populate('contacts')
                .populate('primaryContact')
                .populate('bankDetails')
                .populate('ledger')
                .populate('otherDetails')
                .exec();
            return Promise.resolve(entity);
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

    async fetchCustomers(){
        try {
            const entityDocs = await this.model.find({type:"customer"})
                .populate('addresses')
                .populate('contacts')
                .populate('primaryContact')
                .populate('bankDetails')
                .populate('ledger')
                .populate('otherDetails');
            return Promise.resolve(entityDocs);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getVendors(){
        try {
            const entityDocs = await this.model.find({type:"vendor"})
                .populate('addresses')
                .populate('contacts')
                .populate('primaryContact')
                .populate('bankDetails')
                .populate('ledger')
                .populate('otherDetails');
            return Promise.resolve(entityDocs);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getEntityOpeningBalanceStatus(entityId){
        try {
            const doc = await this.model.findById(entityId).populate({path:'otherDetails'});
            const openingBalance = doc.otherDetails.totalAmount;
            const pendingBalance = doc.otherDetails.pendingAmount;
            const paymentStatus = doc.otherDetails.status;
            return Promise.resolve({openingBalance, pendingBalance, paymentStatus});
        } catch (error) {
            return Promise.resolve(error);
        }
    }
}
