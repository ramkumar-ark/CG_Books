import { useParams, useHistory } from "react-router-dom";
import { Typography } from "antd";
import { CloseOutlined, EditOutlined, DeleteOutlined, FilePdfOutlined, DollarCircleOutlined} from "@ant-design/icons"
import { Invoice, generatePdf } from "./PdfGenerator";
import { useGetSelectedOrgQuery } from "../../service/appApi";
import useAuthentication from "../../useAuthentication";
import { useContext } from "react";
import { useGetVoucherDataQuery } from "../../service/transactionsApi";
import { PDFViewer } from "@react-pdf/renderer";

const { Title, Link } = Typography;

const SingleInvoiceView = () => {
    const history = useHistory();
    const { transactionId } = useParams();
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    const {data} = useGetSelectedOrgQuery(user.id);
    
    const {data:data1} = useGetVoucherDataQuery(
        {orgId:data?.selectedOrg['_id'], voucher:'Sales', transactionId}, {skip: !data}
    );
    const invoiceData = {org:data?.selectedOrg, ...data1?.voucher};
    return (
        <>
        <div 
            style={{
                borderBottom:"ridge", position:"sticky", top:"64px", zIndex:999, backgroundColor:"whitesmoke",
                display:'flex', justifyContent:'space-between', padding:"0px 7px 0px 10px", 
                alignItems:'center'
            }}
        >
            <Title level={4} style={{marginTop:16}}>{invoiceData.voucherNumber}</Title>
            <Link onClick={() => history.goBack()}>
                <CloseOutlined style={{fontSize:20, color:'grey'}}/>
            </Link>
                
        </div>
        <div style={{position:"sticky", top:'121px', borderBottom: 'ridge', backgroundColor:'#fff',
            display:"flex", justifyContent:'flex-start'}}
        >
            {
            [
                {label: 'Edit', icon:() => <EditOutlined/>, link:'/app/home/invoices/edit'},
                {label: 'Delete', icon:() => <DeleteOutlined/>, link:'/app/home/invoices/edit'},
                {label: 'Download PDF', icon:() => <FilePdfOutlined/>, 
                    fn: (event) => generatePdf(invoiceData)},
                {label: 'Record Payment', icon:() => <DollarCircleOutlined/>, link:'/app/home/invoices/edit'},
            ].map(e =>
                <Link onClick={e.fn}>
                    <div style={{padding:10, borderRight:'ridge'}}>
                        <e.icon/> {e.label}
                    </div>
                </Link> 
                )
            }
        </div>
        <div style={{margin:10}}>
            {(data && data1) && 
                <PDFViewer showToolbar={false} width='60%' height={600}>
                    <Invoice invoice={invoiceData}/>
                </PDFViewer>
            }
        </div>
        </>
    );
};

export default SingleInvoiceView;
