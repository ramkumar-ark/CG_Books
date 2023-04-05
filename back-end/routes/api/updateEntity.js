import { getDbController } from "../../db/accountingDb";
import updateLedgerClosingBalance from "../../utils/updateLedgerClosingBalance";

const isAllValuesUndefiend = (obj) =>
    (Object.values(obj).every((element) => element === undefined));

const updateEntity = async(req, res) => {
    try {
        const {
            name,
            companyName,
            website,
            pan,
            creditPeriod,
            shippingAddress,
            billingAddress,
            contacts,
            primaryContact,
            bankDetails,
            openingBalance,
            remarks,
            type,
            customerType,
            userId,
            orgId,
        } = req.body;
        const {entityId} = req.params;
        // get the database controllers of the active organization
        let dbController = await getDbController(orgId);
        const entity = await dbController.entity.getEntity(entityId);
        // check for invalid entity type
        const mapGroupToType = {customer: "Accounts Receivable", vendor:"Accounts Payable"};
        if (!(Object.keys(mapGroupToType).includes(type))) 
            return res.status(403).json({error:"Invalid Entity Type"});
        // update other details document for opening balance
        await dbController.otherDetails.update(entity.otherDetails, {totalAmount: openingBalance});
        // create address documents and store Ids of the same in array
        const addressIds = entity.addresses;
        let index = 0;
        for (const address of [{...shippingAddress, type:"shipping"}, billingAddress]){
            if (address && !isAllValuesUndefiend(address)){
                if (addressIds.length > index)
                    await dbController.address.update(address, addressIds[index]);
                else{
                    const addressId = await dbController.address.create(address);
                    addressIds.push(addressId);
                }
            }else if (addressIds.length > index){
                await dbController.address.delete(addressIds[index]);
                addressIds.splice(index, 1);
            }
            index++;
        }
        console.log("updated required address documents")
        // create contact for primary contact and get back the id of the document.
        let primaryContactId = entity.primaryContact;
        if (!isAllValuesUndefiend(primaryContact)){
            const doc = await dbController.contact.update(primaryContact, primaryContactId);
        }
        console.log("Updated contact document for primary contact.")
        // create contacts documents and store Ids of the same in array
        const contactIds = entity.contacts;
        const contactsArray = contacts || [];
        index = 0;
        for (const contact of contactsArray){
            if (contact && !isAllValuesUndefiend(contact)){
                const contactId = contactIds.length>index ? 
                    await dbController.contact.update(contact, contactIds[index]) :
                    await dbController.contact.create(contact);
                !(contactIds.length>index) && contactIds.push(contactId);
            }
            index++;
        }
        console.log("Created contact documents for other contacts.")
        // create bankDetails document and get back the id of the document.
        let bankDetailsId = entity.bankDetails;
        if (bankDetails && !isAllValuesUndefiend(bankDetails)){
            if (bankDetailsId) await dbController.bankDetails.update(bankDetails, bankDetailsId)
            else bankDetailsId = await dbController.bankDetails.create(bankDetails);
        }
        // create ledger document and get back the id of the document.
        const groupId = await dbController.primaryGroup.getByName(mapGroupToType[type]);
        await dbController.ledger.update(
            `${name} - ${type} A/c`,
            groupId,
            `Ledger for tracking amount receivable from ${type} ${name}`,
            openingBalance,
            entity.ledger,
        );
        // update closing balance of ledger of the entity.
        await updateLedgerClosingBalance(orgId, entity.ledger);
        // Update entity document and return the id of document as response.
        const entityDetails = {
            entityId, name, companyName, website, pan, creditPeriod, remarks, type, userId, addressIds,
            contactIds, customerType
        };
        const entityDoc = await dbController.entity.update(entityDetails);
        res.json({entityId: entityDoc.id});

    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default updateEntity;
