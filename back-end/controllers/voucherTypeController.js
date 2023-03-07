import { Types } from "mongoose";

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

    async getVouchers(name){
        try {
            const doc = await this.model.findOne(
                {name},
                {'transactions.transactions':1}
            )
            .populate({
                path:'transactions.transactions.transaction',
                populate:{
                    path:'otherDetails',
                    model:'OtherDetails',
                }
            });
            let vouchers = [];
            for (const finYrTransac of doc.transactions){
                vouchers = [...vouchers, ...finYrTransac.transactions];
            }
            return Promise.resolve(vouchers);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getVoucherData(transactionId, name){
        try {
            const doc = await this.model.findOne({name}, {transactions:1, _id:0})
            .transform((res) => {
                for (const obj of res.transactions){
                    for (const transac of obj.transactions){
                        if (String(transac.transaction['_id']) === String(new Types.ObjectId(transactionId)))
                            return transac;
                    }
                }
                return null;
            })
            .populate({
                path:'transactions.transactions.transaction',
                populate:{
                    path:'otherDetails debits.ledger credits.ledger',
                }
            });
            return Promise.resolve(doc);
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
        return isDuplicate;
    }
}