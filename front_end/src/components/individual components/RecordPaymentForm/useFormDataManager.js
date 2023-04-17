
export default function useFormDataManager(form) {
    const changeAmountReceivedField = (value) => {
        form.setFieldValue('amount', value);
    };

    return {changeAmountReceivedField};
}