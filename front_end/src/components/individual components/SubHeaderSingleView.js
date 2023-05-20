import { Typography } from "antd";
import { EditOutlined, DeleteOutlined, FilePdfOutlined, DollarCircleOutlined } from '@ant-design/icons';

const { Link } = Typography;

const SubHeaderSingleView = ({editFunction, deleteFunction, downloadFunction, recordPaymentFunction, 
    topOffset}) => {
    return (
        <div style={{position:"sticky", top:topOffset || 0, borderBottom: 'ridge', backgroundColor:'#fff',
            display:"flex", justifyContent:'flex-start'}}
        >
            {
            [
                {label: 'Edit', icon:() => <EditOutlined/>, fn:editFunction},
                {label: 'Delete', icon:() => <DeleteOutlined/>, fn:deleteFunction},
                {label: 'Download PDF', icon:() => <FilePdfOutlined/>, fn:downloadFunction},
                {label: 'Record Payment', icon:() => <DollarCircleOutlined/>, fn:recordPaymentFunction},
            ].map((e, i) => e.fn &&
                <Link onClick={e.fn} key={i+1}>
                    <div style={{padding:10, borderRight:'ridge'}}>
                        <e.icon/> {e.label}
                    </div>
                </Link> 
                )
            }
        </div>
    );
};

export default SubHeaderSingleView;
