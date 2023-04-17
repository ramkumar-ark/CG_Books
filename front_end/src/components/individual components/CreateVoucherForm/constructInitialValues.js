import dayjs from 'dayjs';

const constructInitialValues = (voucherData, entityType) => {
    const {discount: discountAmount, rounding: roundingOff, voucherNumber} = voucherData;
    const {linkedEntity, partyName, billingAddress, shippingAddress, orderNumber, subject,
            notes, discount, termsAndConditions, totalAmount
        } = voucherData.otherDetails;
    const referenceNumber = voucherData.transaction.referenceNumber;
    const voucherDate = dayjs(new Date(voucherData.transaction.transactionDate));
    const creditPeriod = {
        value: voucherData.otherDetails.creditTerms.value,
        unit: voucherData.otherDetails.creditTerms.unit,
        dueDate: dayjs(new Date(voucherData.otherDetails.dueDate)),
    };
    const result = {partyName, billingAddress, shippingAddress, orderNumber, creditPeriod, voucherDate,
        discount, discountAmount, roundingOff, totalAmount, notes};
    if (entityType==='customer')
    return {customer:linkedEntity, voucherNumber:voucherNumber, subject, termsAndConditions, ...result};
    if (entityType === 'vendor')
    return {vendor:linkedEntity, voucherNumber:referenceNumber, notes:notes, ...result};
};

export default constructInitialValues;