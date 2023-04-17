import useGetVouchers from "../../hooks/useGetVouchers";
import { sortOptions } from "./relavantData";
import useSearchParams from "../../hooks/useSearchParams";

export default function useGetData(){
    const {sortBy, sortOrder} = useSearchParams();
    const { vouchers, refetchVouchers } = useGetVouchers('Payment');
    const paymentsData = vouchers && [...vouchers].sort(
        (a,b) => sortOrder==='A' ? a[sortBy]-b[sortBy] : b[sortBy]-a[sortBy]
    );
    return {paymentsData, sortOptions, refetchVouchers};
};
