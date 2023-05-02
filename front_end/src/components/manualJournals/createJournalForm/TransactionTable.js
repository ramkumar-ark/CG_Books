import { Form, InputNumber, Table, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import SelectLedgerAccount from "./SelectLedgerAccount";
import { useReducer } from "react";
import TotalsSection from "./TotalsSection";
import deepClone from "../../../utilities/deepClone";

const {Link} = Typography;

const computeTotalData = (entries) => {
    if (entries){
        const debitTotal = entries.reduce((pv, e) => (e.debit || 0) + pv, 0);
        const creditTotal = entries.reduce((pv, e) => (e.credit || 0) + pv, 0);
        const difference = Math.abs(debitTotal - creditTotal);
        return {credit:creditTotal, debit:debitTotal, difference:{
            debit: creditTotal > debitTotal ? difference : 0,
            credit: debitTotal > creditTotal ? difference : 0,
        }};
    }else return {credit:0, debit:0, difference:{debit:0, credit:0}};
};

const reducer = (state, action) => {
    let newState = deepClone(state);
    switch (action.type) {
        case 'ADD_ROW':
            newState.tableData.push({});
            return newState;
        case 'DELETE_ROW':
            newState.tableData.splice(action.payload,1);
            return newState;
        case 'AMOUNT_CHANGE':
            newState.totalData = computeTotalData(action.payload);
            return newState;
        default:
            throw(new Error('Undefined action dispatched for State of TransactionTable Component'));
    }
};

const TransactionTable = ({data, formDataManager}) => {
    const [state, dispatch] = useReducer(reducer, 
        {tableData:(data || [{}, {}]), totalData:computeTotalData(data)});
    const onAmountChange = () => {
        dispatch({type:'AMOUNT_CHANGE', payload:formDataManager.getEntries()});
    };
    const columns = [
        {
            title:'Account',
            dataIndex:'ledger',
            className:'tableHeader',
            render: (text, record, index) => <SelectLedgerAccount name={['entries', index, 'ledger']}
                initialValue={text}/>
        },
        {
            title:'Debits',
            dataIndex: 'debit',
            className:'tableHeader',
            width:'20%',
            align:'right',
            render: (text, record, index) => (
                <Form.Item name={['entries', index, 'debit']} wrapperCol={{span:24}}>
                    <InputNumber style={{width:'100%'}} onChange={onAmountChange}/>
                </Form.Item>
            ),
        },
        {
            title:'Credits',
            dataIndex: 'credit',
            className:'tableHeader',
            width:'20%',
            align:'right',
            render: (text, record, index) => (
                <Form.Item name={['entries', index, 'credit']} wrapperCol={{span:24}}>
                    <InputNumber style={{width:'100%'}} onChange={onAmountChange}/>
                </Form.Item>
            ),
        },
        {
            width:'50px',
            align:'center',
            render: (text, record, index) => {
                if (state.tableData.length > 2)
                    return (
                        <Link onClick={() => {
                            dispatch({type:'DELETE_ROW', payload:index});
                            formDataManager.deleteEntryItem(index);
                        }}>
                            <DeleteOutlined/>
                        </Link>
                    );
            },
        }
    ];
    return (
        <>
            <Table dataSource={state.tableData} columns={columns} pagination={false} bordered={true} 
                style={{marginBottom:20}}/>
            <Link onClick={() => {dispatch({type:'ADD_ROW'})}} ><PlusOutlined/>Add another line</Link>
            <TotalsSection totalAmounts={state.totalData} />
        </>
    );
};

export default TransactionTable;
