import useGetLedgers from './useGetLedgers';

export default function useGetLedger(ledgerId) {
    const ledgers = useGetLedgers();
    const ledger = ledgerId && ledgers?.find(e => e.key === ledgerId);
    if (ledger) {
        ledger.groupName = ledger.group;
        ledger.group = ledger.groupId;
        ledger.opBalance = ledger.opBal;
        delete ledger['opBal'];
    }
    return ledger;
};