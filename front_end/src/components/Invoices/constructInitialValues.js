import dayjs from 'dayjs';

const constructInitialValues = (invoiceData) => {
    const {discount: discountAmount, rounding: roundingOff, voucherNumber:invoiceNumber} = invoiceData;
    const {linkedEntity: customer, partyName, billingAddress, shippingAddress, orderNumber, subject,
            notes:customerNotes, discount, termsAndConditions, totalAmount
        } = invoiceData.otherDetails;
    const invoiceDate = dayjs(new Date(invoiceData.transaction.transactionDate));
    const creditPeriod = {
        value: invoiceData.otherDetails.creditTerms.value,
        unit: invoiceData.otherDetails.creditTerms.unit,
        dueDate: dayjs(new Date(invoiceData.otherDetails.dueDate)),
    }
    return {
        customer, invoiceNumber, partyName, billingAddress, shippingAddress, orderNumber, invoiceDate,
        creditPeriod, subject, customerNotes, discount, termsAndConditions, discountAmount, roundingOff,
        totalAmount,
    };
};

export default constructInitialValues;