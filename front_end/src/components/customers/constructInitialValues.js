
const initialValues = (entityData) => {
    const values = {
        customerType: entityData.customerType || null,
        primaryContact: entityData.primaryContact,
        companyName: entityData.companyName,
        name: entityData.name,
        website: entityData.website,
        pan: entityData.pan,
        openingBalance: entityData.ledger.opBalance,
        creditPeriod: entityData.creditPeriod,
        shippingAddress: entityData.addresses.find(e => e.type === 'shipping'),
        billingAddress: entityData.addresses.find(e => e.type === 'billing'),
        remarks: entityData.remarks,
    };
    return values;
};

export default initialValues;
