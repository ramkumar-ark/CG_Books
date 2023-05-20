import { Spin, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import SubHeader from "../individual components/SubHeader";
import SubHeaderSingleView from "../individual components/SubHeaderSingleView";
import ReceiptVoucherView from "./ReceiptVoucherView";
import useGetVoucher from "../../hooks/useGetVoucher";
import { useRef } from "react";
import { downloadPdf } from "../../utilities/downloadPdf";
import useDeleteVoucher from "../../hooks/useDeleteVoucher";

const {Title, Link} = Typography;

const ViewSingleReceipt = () => {
    const history = useHistory();
    const {pathname} = useLocation();
    const {transactionId} = useParams();
    const voucherData = useGetVoucher(transactionId, 'Receipt');
    const topHeaderRef = useRef(null);
    const [deleteReceipt, {isLoading}] = useDeleteVoucher(transactionId, voucherData);

    return (
        <Spin spinning={isLoading || !voucherData.voucherNumber}>
            <SubHeader topOffset={0} componentref={topHeaderRef}>
                <Title level={3}>{voucherData?.voucherNumber || 'Loading...'}</Title>
                <Link onClick={() => history.goBack()}>
                    <CloseOutlined style={{fontSize:20, color:'grey'}}/>
                </Link>
            </SubHeader>
            <SubHeaderSingleView 
                deleteFunction={()=>{deleteReceipt()}} 
                downloadFunction={()=>{downloadPdf(ReceiptVoucherView, {data:voucherData, isPdf:true})}} 
                editFunction={()=>{history.push(pathname.replace(transactionId, `edit/${transactionId}`))}}
                topOffset={topHeaderRef.current?.clientHeight}/>
            <div style={{padding:30}}>
                {voucherData.otherDetails && <ReceiptVoucherView data={voucherData} />}
            </div>
        </Spin>
    );
};

export default ViewSingleReceipt;
