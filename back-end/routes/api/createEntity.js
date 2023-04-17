import { getDbController } from "../../db/accountingDb";
import updateOpeningBalanceDifference from "../../utils/updateOpeningBalanceDifference";

const isAllValuesUndefiend = (obj) =>
    (Object.values(obj).every((element) => element === undefined));

const createEntity = async(req, res) => {
    const createdMasters = [];
    let organizationId;
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
        // get the database controllers of the active organization
        organizationId = orgId;
        console.log(orgId);
        let dbController = await getDbController(orgId);
        console.log("Received Database Controllers")
        // check for invalid entity type
        const mapGroupToType = {customer: "Accounts Receivable", vendor:"Accounts Payable"};
        if (!(Object.keys(mapGroupToType).includes(type))) 
            return res.status(403).json({error:"Invalid Entity Type"});
        // create address documents and store Ids of the same in array
        const addressIds = [];
        for (const address of [{...shippingAddress, type:"shipping"}, billingAddress]){
            if (address && !isAllValuesUndefiend(address)){
                const addressId = await dbController.address.create(address);
                addressIds.push(addressId);
                createdMasters.push({controller: "address", docId: addressId});
            }
        }
        console.log("created required address documents")
        // create contact for primary contact and get back the id of the document.
        let primaryContactId;
        if (!isAllValuesUndefiend(primaryContact)){
            primaryContactId = await dbController.contact.create(primaryContact);
            createdMasters.push({controller: "contact", docId: primaryContactId});
        }
        console.log("Created contact document for primary contact.")
        // create contacts documents and store Ids of the same in array
        const contactIds = [];
        const contactsArray = contacts || [];
        for (const contact of contactsArray){
            if (contact && !isAllValuesUndefiend(contact)){
                const contactId = await dbController.contact.create(contact);
                contactIds.push(contactId);
                createdMasters.push({controller: "contact", docId: contactId});
            }
        }
        console.log("Created contact documents for other contacts.")
        // create bankDetails document and get back the id of the document.
        let bankDetailsId=[];
        if (bankDetails && !isAllValuesUndefiend(bankDetails)){
            for (const bankDetail of bankDetails){
                const docId = await dbController.bankDetails.create(bankDetail);
                bankDetailsId.push(docId);
                createdMasters.push({controller: "bankDetails", docId});
            }
        }
        // create ledger document and get back the id of the document.
        const groupId = await dbController.primaryGroup.getByName(mapGroupToType[type]);
        const opBal = type === 'customer' ? openingBalance : openingBalance * -1;
        const ledgerId = await dbController.ledger.create(
            `${name} - ${type} A/c`,
            groupId,
            `Ledger for tracking amount receivable from ${type} ${name}`,
            opBal,
        );
        createdMasters.push({controller: "ledger", docId: ledgerId});
        // update closing balance
        if (openingBalance) {
            const docId = await dbController.closingBalance.update(ledgerId, opBal);
            await updateOpeningBalanceDifference(orgId);
            createdMasters.push({controller: "closingBalance", docId})
        }
        // create other details document
        const otherDetailsId = await dbController.otherDetails.create({
            totalAmount:openingBalance, status:'unPaid',
        })
        createdMasters.push({controller: "otherDetails", docId: otherDetailsId});
        // Create entity document and return the id of document as response.
        const entityDetails = {
            name, companyName, website, pan, creditPeriod, remarks, type, userId, addressIds,
            primaryContactId, contactIds, bankDetailsId, ledgerId, customerType, otherDetailsId,
        };
        const entityDoc = await dbController.entity.create(entityDetails);
        res.json({entityId: entityDoc.id});

    } catch (error) {
        console.log(error);
        try {
            const dbController = getDbController(organizationId);
            for (const master of createdMasters){
                await dbController[master.controller].delete(master.docId);
                console.log(`Deleted document of ${master.controller}`);
            }
            await updateOpeningBalanceDifference(organizationId);
        } catch (err) {
            return res.status(403).json({err});
        }
        res.status(403).json({error});
    }
};

export default createEntity;
