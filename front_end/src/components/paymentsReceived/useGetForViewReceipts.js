import useGetVouchers from "../../hooks/useGetVouchers";
import { sortOptions } from "./relavantData";
import useSearchParams from "../../hooks/useSearchParams";

export default function useGetForViewReceipts(){
    const {sortBy, sortOrder} = useSearchParams();
    const { vouchers, refetchVouchers } = useGetVouchers('Receipt');
    const receiptsData = vouchers && [...vouchers].sort(
        (a,b) => sortOrder==='A' ? a[sortBy]-b[sortBy] : b[sortBy]-a[sortBy]
    );
    return {receiptsData, sortOptions, refetchVouchers};
};
