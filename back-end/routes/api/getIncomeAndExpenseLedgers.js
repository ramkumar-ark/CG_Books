import getLedgersOfAccountType from "./getLedgersOfAccountType";

const getIncomeAndExpenseLedgers = async (req, res, next) => {
    try {
        [req.params.accountType, req.isMiddleware] = ['Expense', true];
        const expenseLedgers = await getLedgersOfAccountType(req, res);
        [req.params.accountType, req.isMiddleware] = ['Income', true];
        const incomeLedgers = await getLedgersOfAccountType(req, res);
        req.result = [incomeLedgers, expenseLedgers];
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getIncomeAndExpenseLedgers;
