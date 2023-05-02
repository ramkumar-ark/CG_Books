class FormDataManager {
    constructor(formObj) {
        this.form = formObj;
    }

    getEntries() {
        const data = this.form.getFieldValue('entries');
        return data;
    }

    setEntries(data) {
        this.form.setFieldsValue({'entries': data});
    }

    deleteEntryItem(index) {
        const entriesList = this.getEntries();
        entriesList.splice(index, 1);
        this.setEntries(entriesList);
    }

    isTotalsMatched() {
        const entriesList = this.getEntries();
        const debitTotal = entriesList.reduce((pv, e) => pv + (e.debit || 0), 0);
        const creditTotal = entriesList.reduce((pv, e) => pv + (e.credit || 0), 0);
        return debitTotal === creditTotal;
    }
}

export default FormDataManager;
