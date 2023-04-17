
const initialValues = (entityData) => {
    const values = {
        customerType: entityData.customerType || null,
        primaryContact: entityData.primaryContact,
        companyName: entityData.companyName,
        name: entityData.name,
        website: entityData.website,
        pan: entityData.pan,
        openingBalance: entityData.type === 'vendor' ? entityData.ledger.opBalance * -1 : entityData.ledger.opBalance,
        creditPeriod: entityData.creditPeriod,
        shippingAddress: entityData.addresses.find(e => e.type === 'shipping'),
        billingAddress: entityData.addresses.find(e => e.type === 'billing'),
        bankDetails: entityData.bankDetails,
        remarks: entityData.remarks,
    };
    return values;
};

export default initialValues;
