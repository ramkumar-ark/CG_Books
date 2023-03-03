import { Schema } from "mongoose";

const voucherSchema = new Schema({
    voucherNumber:{type:String, required:true},
    transaction:{type:Schema.Types.ObjectId, ref: 'Transaction', required:true},
}, {_id:false});

const transactionsSchema = new Schema({
    financialYear:{type:String, required:true},
    transactions:[voucherSchema],
}, {_id: false});

// transactionsSchema.index({ 'transactions.voucherNumber': 1, financialYear: 1 }, { unique: true });

const voucherTypeSchema = new Schema({
    name:{type:String, required:true, unique:true},
    primaryType:{type:String, enum:['sales', 'purchase', 'payment', 'receipt', 'journal'], required:true},
    transactions:[transactionsSchema],
});

transactionsSchema.pre('save', function(next){
    console.log(this);
    const voucherNos = this.transactions.map(e => e.voucherNumber);
    if (voucherNos.length !== [...new Set(voucherNos)].length)
        next(new Error('Voucher Number already exists.'));
    const transacIds = this.transactions.map(e => e.transaction);
    if (transacIds.length !== [...new Set(transacIds)].length)
        next(new Error('Transaction already mapped to a voucher number.'));
    // if (this.transactions)
    else next();
});

voucherTypeSchema.pre('save', function(next){
  console.log(this.transactions);
  const finYrs = this.transactions.map(e => e.financialYear);
  if (finYrs.length !== [...new Set(finYrs)].length)
    next(new Error('Financial Year already exists.'));
  else next();
});

voucherSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Voucher Number already exists.'));
    } else {
      next();
    }
  });

voucherSchema.path('voucherNumber').validate(function (value) {
  return value !== null && value.trim().length > 0;
}, 'Voucher Number must not be empty');

export default voucherTypeSchema;
