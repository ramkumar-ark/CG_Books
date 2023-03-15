import { Select, Space, Typography, DatePicker, Button, Modal } from "antd";
import { PDFViewer } from "@react-pdf/renderer";
import { CalendarOutlined } from '@ant-design/icons'
import { useState } from "react";
import { Statement } from "./StatementPdf";
import { downloadPdf } from "../../utilities/downloadPdf";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const periodOptions = [
    {value: 'today', label:'Today'},
    {value: 'thisWeek', label:'This Week'},
    {value: 'thisMonth', label:'This Month'},
    {value: 'thisQuarter', label:'This Quarter'},
    {value: 'thisYear', label:'This Year'},
    {value: 'yesterday', label:'Yesterday'},
    {value: 'previousWeek', label:'Previous Week'},
    {value: 'previousMonth', label:'Previous Month'},
    {value: 'previousQuarter', label:'Previous Quarter'},
    {value: 'previousYear', label:'Previous Year'},
    {value:'custom', label:'Custom'},
];

const getPeriod = (period='thisMonth') => {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();
    switch (period) {
        case 'thisYear':
            startDate = new Date(today.getFullYear()-(today.getMonth()<3 ? 1 : 0), 3, 1);
            endDate = new Date(today.getFullYear()+(today.getMonth()<3 ? 0 : 1), 2, 31);
            return {startDate, endDate}
            break;
        case 'today':
            return {startDate, endDate};
            break;
        case 'thisWeek':
            endDate.setDate(today.getDate() + 6 - today.getDay());
            startDate.setDate(today.getDate() - today.getDay());
            return {startDate, endDate};
            break;
        case 'thisMonth':
            startDate.setDate(1);
            endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
            endDate.setDate(0);
            return {startDate, endDate};
            break;
        case 'thisQuarter':
            startDate.setMonth(Math.floor(today.getMonth() / 3) * 3);
            startDate.setDate(1);
            endDate.setMonth(startDate.getMonth() + 3);
            endDate.setDate(0);
            return {startDate, endDate};
            break;
        case 'yesterday':
            startDate.setDate(startDate.getDate() - 1);
            endDate.setDate(endDate.getDate() - 1);
            return {startDate, endDate};
            break;
        case 'previousWeek':
            endDate.setDate(today.getDate() + 6 - today.getDay() - 7);
            startDate.setDate(today.getDate() - today.getDay() - 7);
            return {startDate, endDate};
            break;
        case 'previousMonth':
            startDate.setDate(1);
            startDate.setMonth(startDate.getMonth() -1);
            endDate.setDate(0);
            return {startDate, endDate};
            break;
        case 'previousQuarter':
            startDate.setMonth((Math.floor(today.getMonth() / 3) * 3) - 3);
            startDate.setDate(1);
            endDate.setMonth(startDate.getMonth() + 3);
            endDate.setDate(0);
            return {startDate, endDate};
            break;
        case 'previousYear':
            startDate = new Date(today.getFullYear()-(today.getMonth()<3 ? 1 : 0) - 1, 3, 1);
            endDate = new Date(today.getFullYear()+(today.getMonth()<3 ? 0 : 1)-1, 2, 31);
            return {startDate, endDate}
            break;
        default:
            break;
    }
};

const StatementTab = ({entity, organization}) => {
    const [period, setPeriod] = useState(getPeriod);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customPeriod, setCustomPeriod] = useState();
    console.log(entity, organization);
    const onPeriodChange = (value) => {
        if (value === 'custom') setIsModalOpen(true);
        else setPeriod(getPeriod(value));
    };
    const onHandleOk = () => {
        setPeriod(customPeriod);
        setIsModalOpen(false);
    };
    return (
        <div style={{padding:'20px 15px'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <Space size={50}>
                    <Space>
                    <Text>Period <CalendarOutlined/>:</Text>
                    <Select  
                        options={periodOptions} 
                        listHeight={360}
                        defaultValue='thisMonth'
                        onSelect={onPeriodChange}
                        style={{width:150}}
                    />
                    <Modal title="Select Period" open={isModalOpen} onOk={onHandleOk} onCancel={()=>{setIsModalOpen(false)}}>
                        <RangePicker onChange={(dates) => {
                            setCustomPeriod({startDate:new Date(dates[0]), endDate:new Date(dates[1])});
                            }}
                            format="DD-MM-YYYY"
                        />
                    </Modal>
                    </Space>
                    <Space>
                    <Text>Filter By:</Text>
                    <Select 
                        options={[{value:'all', label:'All'}, {value:'outstanding', label:'Outstanding'}]}
                        defaultValue='all'
                        style={{width:120}}
                    />
                    </Space>
                </Space>
                <Button type="primary" 
                    onClick={() => {downloadPdf(Statement, {entity, organization, period})}}>Download PDF</Button>
            </div>
            <div style={{margin:'40px 0 20px'}}>
                <Space direction="vertical">
                    <Text style={{fontSize:17}}>Customer Statement for {organization.name}</Text>
                    <Text>From {period.startDate.toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})} to {period.endDate.toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
                </Space>
            </div>
            <div>
                <PDFViewer showToolbar={false} width='58.5%' height={923}>
                    <Statement entity={entity} organization={organization} period={period}/>
                </PDFViewer>
            </div>
        </div>    
    );
};

export default StatementTab;
