
export default function useFormDataManager(form){
    const changeCreditPeriod = (creditPeriod) => {
        const value = creditPeriod?.value || 0;
        const unit = creditPeriod.unit;
        const voucherDate = form.getFieldValue('voucherDate');
        const dueDate = voucherDate && voucherDate.add(value, unit);
        form.setFieldsValue({'creditPeriod':{value, unit, dueDate}});
    };
    const changeDueDate = () => {
        const creditPeriod = form.getFieldValue('creditPeriod');
        changeCreditPeriod(creditPeriod);
    };
    const changeItemDetailsList = (list) => {form.setFieldsValue({'items':list})};
    const getItemDetailsList = () => {return form.getFieldValue('items')};

    return {
        changeCreditPeriod,
        changeDueDate,
        changeItemDetailsList,
        getItemDetailsList,
    };
}