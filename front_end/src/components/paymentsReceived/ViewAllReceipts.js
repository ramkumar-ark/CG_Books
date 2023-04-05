import Header from "./Header";
import ReceiptsTable from "./ReceiptsTable";
import useGetForViewReceipts from "./useGetForViewReceipts";

const ViewAllReceipts = () => {
    const {receiptsData, sortOptions, refetchVouchers} = useGetForViewReceipts();
    return (
        <div style={{position:'relative'}}>
            <Header onRefresh={refetchVouchers} sortOptions={sortOptions}/>
            <ReceiptsTable data={receiptsData}/>
        </div>
    );
};

export default ViewAllReceipts;
