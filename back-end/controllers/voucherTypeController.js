import { Types } from "mongoose";

export default class VoucherTypeController{
    constructor(voucherTypeModel){
        this.model = voucherTypeModel;
    }

    async create(name, primaryType){
        try {
            const doc = await this.model.create({name, primaryType});
            return Promise.resolve(doc.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getId(name){
        try {
            const docs = await this.model.find({}).exec();
            const doc = await this.model.findOne({name: name});
            return Promise.resolve(doc.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getVoucherNumbers(transactionIds){
        try {
            let idsFound = 0;
            const doc = await this.model.find(
                {}, { transactions: 1, _id:0},
            ).transform((res) => {
                const voucherNumbers = {};
                for (const obj of res){
                    for (const finYr of obj.transactions){
                        for (const transac of finYr.transactions){
                            if (idsFound === transactionIds.length) return voucherNumbers;
                            if (transactionIds.includes(transac.transaction.toString())){
                                voucherNumbers[transac.transaction.toString()] = transac.voucherNumber;
                                idsFound++;
                            }
                        }
                    }
                }
                return voucherNumbers;
            });
            return Promise.resolve(doc)
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
                    {$push:{"transactions":{
                        financialYear, 
                        transactions:[voucher], 
                        lastAutoGeneratedVchNo: voucherNumber===1 ? 1 : undefined
                    }}},
                    {new: true});
            }else{
                if (VoucherTypeController.checkIsDuplicateVoucherNo(search, voucherNumber, financialYear)){ 
                    return Promise.reject("Duplicate Voucher Number");
                }
                const doc = await this.model.findOneAndUpdate(
                    { name: voucherName, transactions:{$elemMatch: {financialYear}}},
                    { $push:{"transactions.$.transactions": voucher} },
                    { new: true }
                );
                await this.updateLastAutoGeneratedVchNo(voucherName, financialYear, voucherNumber);
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

    async getVouchers(name, isPrimary=false){
        try {
            const findQuery = isPrimary ? {primaryType:name} : {name};
            const doc = await this.model.find(
                findQuery,
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
            for (const voucherType of doc){
                for (const finYrTransac of voucherType.transactions){
                    vouchers = [...vouchers, ...finYrTransac.transactions];
                }
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

    async deleteVoucherData(transactionId, voucherDate, voucherName, voucherNumber){
        try {
            const finYr = VoucherTypeController.getFinancialYearFromDate(new Date(voucherDate));
            const doc = await this.model.findOneAndUpdate(
                { name: voucherName, transactions:{$elemMatch: {financialYear: finYr}}},
                { $pull:{"transactions.$.transactions": {voucherNumber, transaction:transactionId}} },
                { new: true }
            );
            return Promise.resolve(doc.id)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async updateVoucherNumber(transactionId, newVoucherNumber, oldVoucherDate, voucherName){
        try {
            const financialYear = VoucherTypeController.getFinancialYearFromDate(new Date(oldVoucherDate));
            const search = await this.model.findOne({ name: voucherName, transactions:{$elemMatch: {financialYear}}});
            if (VoucherTypeController.checkIsDuplicateVoucherNo(search, newVoucherNumber, financialYear))
                return Promise.reject("Duplicate Voucher Number");
            const doc = await this.model.updateOne(
                {name: voucherName},
                {'$set':{'transactions.$[].transactions.$[item].voucherNumber': newVoucherNumber}},
                {"arrayFilters":[{'item.transaction':transactionId}]},
            );
            return Promise.resolve(doc.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async updateLastAutoGeneratedVchNo(voucherName, financialYear, voucherNumber){
        try {
            const doc = await this.model.findOneAndUpdate(
                { name: voucherName, transactions:{$elemMatch: {financialYear, lastAutoGeneratedVchNo:Number(voucherNumber)-1}}},
                { $set:{"transactions.$.lastAutoGeneratedVchNo": Number(voucherNumber)} },
                { new: true }
            );
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getLastAutoGeneratedVchNo(voucherName, voucherDate=new Date()){
        try {
            const financialYear = VoucherTypeController.getFinancialYearFromDate(new Date(voucherDate));
            const doc = await this.model.findOne(
                { 
                    name: voucherName, 
                    transactions:{$elemMatch: {financialYear}}
                },
                { 'transactions.lastAutoGeneratedVchNo':1, 'transactions.financialYear':1, '_id':0}
            ).transform((res) => {
                if (res){
                    return res.transactions.find(
                        e => e.financialYear === financialYear
                    ).lastAutoGeneratedVchNo;
                }
            });
            const voucherNumber = doc || 0;
            return Promise.resolve(voucherNumber);
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