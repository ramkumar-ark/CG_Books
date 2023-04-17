import { useParams } from "react-router-dom";
import useGetEntities from "../../hooks/useGetEntities";
import constructInitialValues from "../individual components/CreateVoucherForm/constructInitialValues";
import useGetVoucher from "../../hooks/useGetVoucher";
import { Spin, Typography } from "antd";
import { CloseOutlined } from '@ant-design/icons'
import CreateVoucherForm from "../individual components/CreateVoucherForm/CreateVoucherForm";
import useSelectedOrg from "../../hooks/useSelectedOrg";
import useCreateVoucher from "../../hooks/useCreateVoucher";
import useUpdateVoucher from "../../hooks/useUpdateVoucher";

const {Title} = Typography;

const CreateBillPage = ({}) => {
    const {transactionId} = useParams();
    const {entityDataObj} = useGetEntities('vendor');
    const voucherData = useGetVoucher(transactionId, 'Purchase');
    const initialValues = (transactionId && voucherData.voucherNumber) ? constructInitialValues(voucherData, 'vendor') : {
        discount:{value:0, unit:'absolute'},};
    const [createVoucher, {isLoading}] = useCreateVoucher();
    const [updateVoucher, {isLoading:isUpdating}] = useUpdateVoucher(transactionId, voucherData);
    const {userId, '_id':orgId} = useSelectedOrg();
    const onFormSubmit = (data) => {
        const requestObject = data;
        requestObject.transaction.userId = userId;
        requestObject.orgId = orgId;
        transactionId ? updateVoucher(requestObject) : createVoucher(requestObject);
    };
    
    return (
        <Spin spinning={(!(transactionId && voucherData.voucherNumber) && !(!transactionId && entityDataObj)) || isLoading || isUpdating}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', 
                padding:`0px 20px`, marginBottom:20 ,borderBottom:'1px solid #eee'}}>
                <Title level={3}>{transactionId ? 'Edit' : 'New'} Bill</Title>
                <CloseOutlined style={{fontSize:18}}/>
            </div>
            {((transactionId && initialValues.vendor) || (!transactionId && entityDataObj)) &&
            <CreateVoucherForm entityDataObj={entityDataObj} 
                voucherData={voucherData} initialValues={initialValues} voucherType={'bill'} 
                onSave={onFormSubmit}/>}
        </Spin>
    );
};

export default CreateBillPage;
