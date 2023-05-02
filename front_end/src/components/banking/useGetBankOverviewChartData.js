import useSelectedOrg from "../../hooks/useSelectedOrg";
import { useGetGroupRunningBalancesQuery } from "../../service/transactionsApi";
import { useFetchMastersQuery } from "../../service/mastersApi";
import getPeriodicClosingBalances from "../../utilities/getPeriodicClosingBalance";

export default function useGetBankOverviewChartData() {
    const {'_id':orgId, 'createdOn':opBalDate} = useSelectedOrg();
    const {data:masters} = useFetchMastersQuery(orgId, {skip:!orgId});
    const cashGroupId = masters?.groups.find(e => e.name === 'Cash')['_id'];
    const bankGroupId = masters?.groups.find(e => e.name === 'Bank')['_id'];
    const {data:bankGroupData} = useGetGroupRunningBalancesQuery({params:{orgId, groupId:bankGroupId}}, 
        {skip:!orgId || !masters});
    const {data:cashGroupData} = useGetGroupRunningBalancesQuery({params:{orgId, groupId:cashGroupId}}, 
        {skip:!orgId || !masters});
    const last30DaysData = {};
    const last12MonthsData = {};
    last30DaysData['group'] = (bankGroupData && cashGroupData) && 
        getGroupData(bankGroupData, cashGroupData, 30, 'day', opBalDate);
    last12MonthsData['group'] = (bankGroupData && cashGroupData) && 
        getGroupData(bankGroupData, cashGroupData, 12, 'month', opBalDate); 
    const ledgerWiseTransactions = (bankGroupData && cashGroupData) && {
        ...bankGroupData.ledgerWiseTransactions, ...cashGroupData.ledgerWiseTransactions
    };
    for (const ledgerId in (ledgerWiseTransactions || {})) {
        const {'name':ledgerName, 'opBalance':openingBalance} = masters?.ledgers
            .find(e => e['_id'] === ledgerId);
        last30DaysData[ledgerId] = getPeriodicClosingBalances({
            transactions:ledgerWiseTransactions[ledgerId], timeUnit:'day', timeValue:30, 
            groupOrLedgerName:ledgerName, opBalDate, openingBalance,
        });
        last12MonthsData[ledgerId] = getPeriodicClosingBalances({
            transactions:ledgerWiseTransactions[ledgerId], timeUnit:'month', timeValue:12, 
            groupOrLedgerName:ledgerName, opBalDate, openingBalance,
        }); 
    }
    return {last30DaysData, last12MonthsData};
}

function getGroupData(bankGroupData, cashGroupData, timeValue, timeUnit, opBalDate) {
    const {groupTransactions:bankTransactions, openingBalance:bankOpBalance} = bankGroupData;
    const {groupTransactions:cashTransactions, openingBalance:cashOpBalance} = cashGroupData; 
    if (bankTransactions && cashTransactions) {
        const bankData = getPeriodicClosingBalances({transactions:bankTransactions, 
            timeUnit, timeValue, groupOrLedgerName:'Bank', opBalDate, openingBalance:bankOpBalance,
        });
        const cashData = getPeriodicClosingBalances({transactions:cashTransactions, 
            timeUnit, timeValue, groupOrLedgerName:'Cash', opBalDate, openingBalance:cashOpBalance,
        });
        return [...bankData, ...cashData];
    }
}