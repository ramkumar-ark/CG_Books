import { Spin, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import SubHeader from "./SubHeader";
import SubHeaderSingleView from "./SubHeaderSingleView";
import useGetVoucher from "../../hooks/useGetVoucher";
import useGetBankAccounts from "../../hooks/useGetBankAccounts";
import { useRef } from "react";
import { downloadPdf } from "../../utilities/downloadPdf";
import useDeleteVoucher from "../../hooks/useDeleteVoucher";

const {Title, Link} = Typography;

const SingleVoucherView = ({voucherType, VoucherViewComponent, children}) => {
    const history = useHistory();
    const {pathname} = useLocation();
    const {transactionId} = useParams();
    const voucherData = useGetVoucher(transactionId, voucherType);
    const bankAccounts = useGetBankAccounts();
    const topHeaderRef = useRef(null);
    const [deleteVoucher, {isLoading}] = useDeleteVoucher(transactionId, voucherData);

    return (
        <Spin spinning={isLoading || !voucherData.voucherNumber}>
            <SubHeader topOffset={0} componentref={topHeaderRef}>
                <Title level={3}>
                    {(voucherType === 'Purchase' ? voucherData?.transaction?.referenceNumber : voucherData.voucherNumber) 
                        || 'Loading...'}
                </Title>
                <Link onClick={() => history.goBack()}>
                    <CloseOutlined style={{fontSize:20, color:'grey'}}/>
                </Link>
            </SubHeader>
            <SubHeaderSingleView 
                deleteFunction={()=>{deleteVoucher()}} 
                downloadFunction={()=>{downloadPdf(VoucherViewComponent, {data:{...voucherData, bankAccounts}, isPdf:true})}} 
                editFunction={()=>{history.push(pathname.replace(transactionId, `edit/${transactionId}`))}}
                topOffset={topHeaderRef.current?.clientHeight}/>
            {children}
            <div style={{padding:30}}>
                {voucherData.otherDetails && <VoucherViewComponent data={{...voucherData, bankAccounts}} />}
            </div>
        </Spin>
    );
};

export default SingleVoucherView;
