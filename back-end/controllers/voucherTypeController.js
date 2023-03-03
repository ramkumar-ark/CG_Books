
export default class VoucherTypeController{
    constructor(voucherTypeModel){
        this.model = voucherTypeModel;
    }

    async create(name, primaryType){
        try {
            console.log('creating vouchertype ', primaryType);
            const doc = await this.model.create({name, primaryType});
            return Promise.resolve(doc.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getId(name){
        try {
            console.log(name);
            const doc = await this.model.findOne({name}).exec();
            return Promise.resolve(doc.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async addVoucherTransaction(voucherDate, voucherName, transactionId, voucherNumber ){
        try {
            const financialYear = VoucherTypeController.getFinancialYearFromDate(new Date(voucherDate));
            const voucher = {voucherNumber, transaction:transactionId};
            const search = await this.model.findOne({ name: voucherName, transactions:{$elemMatch: {financialYear}}});
            if (!search){
                const doc = await this.model.findOneAndUpdate(
                    { name: voucherName },
                    {$push:{"transactions":{financialYear, transactions:[voucher]}},},
                    {new: true});
                console.log(doc);
            }else{
                if (VoucherTypeController.checkIsDuplicateVoucherNo(search, voucherNumber, financialYear)){ 
                    return Promise.reject("Voucher Number Already used.");
                }
                const doc = await this.model.findOneAndUpdate(
                    { name: voucherName, transactions:{$elemMatch: {financialYear}}},
                    { $push:{"transactions.$.transactions": voucher} },
                    { new: true }
                );
                console.log(doc);
            }           
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async createDefaultVoucherTypes(){
        try {
            const vouchers = ['Sales', 'Purchase', 'Payment', 'Receipt', 'Journal'];
            for (const voucher of vouchers){
                const doc = await this.create(voucher, voucher.toLowerCase());
            }
            return Promise.resolve("Created");
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static getFinancialYearFromDate(date){
        const year = date.getFullYear();
        if (date.getMonth() >= 3) {
            return `${year}-${year + 1}`;
        } else {
            return `${year - 1}-${year}`;
        }
    }

    static checkIsDuplicateVoucherNo(doc, voucherNo, finYr){
        const vouchers = doc.transactions.find(e => e.financialYear === finYr).transactions;
        const isDuplicate = !!vouchers.find(e => e.voucherNumber === voucherNo);
        console.log(isDuplicate);
        return isDuplicate;
    }
}