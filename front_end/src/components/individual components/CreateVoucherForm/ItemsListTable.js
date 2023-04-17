import React, { useEffect, useState } from 'react';
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Form, Input, Typography, InputNumber, Select } from 'antd';

const { Link } = Typography;

const ItemsListTable = ({updateTotal, itemList, accountSelectList, changeItems, getItems}) => {
  const [dataSource, setDataSource] = useState(itemList);
  const calculateItemAmount = (index) => {
      const items = getItems();
      const {quantity, rate} = items[index];
      const totalAmount = Number(quantity || 1) * Number(rate);
      items[index].amount = String(totalAmount.toFixed(2));
      let total = items.reduce((acc, item) => acc + Number(item.amount), 0);
      total = Number(total).toFixed(2);
      changeItems(items);
      updateTotal("subTotal", total);
      setDataSource(items);
  };

  const handleAddRow = () => {
    setDataSource([...dataSource, {}]);
    changeItems([...dataSource, {}]);
  };

  const deleteItem = (index) => {
    console.log(index);
    if (dataSource.length > 1){
    const oldList = [...dataSource];
    console.log(oldList.splice(index,1));
    let total = oldList.reduce((acc, item) => acc + Number(item.amount), 0);
    total = Number(total).toFixed(2);
    changeItems(oldList);
    setDataSource(oldList);
    updateTotal('subTotal', total);
    }
  };

  const columns = [
    {
      title: 'ITEM DETAILS',
      dataIndex: 'details',
      editable: true,
      width:300,
      render: (text, record, index) => (
        <Form.Item name={['items', index, 'details']} initialValue={text} rules={[{required: true, message: "Please type description or item name"}]}>
            <Input.TextArea placeholder='Type an item.'/>
        </Form.Item>
      ),
    },
    {
        title: 'ACCOUNT',
        dataIndex: 'ledger',
        align:'left',
        render: (text, record, index) => (
          <Form.Item name={['items', index, 'ledger']} initialValue={text} style={{minWidth:220}}>
            <Select options={accountSelectList} showSearch optionFilterProp="children" 
                filterOption={(input, option) => 
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}/>
          </Form.Item>
        ),
    },
    {
      title: 'QUANTITY',
      dataIndex: 'quantity',
      editable: true,
      render: (text, record, index) => (
        <Form.Item name={['items', index, 'quantity']} initialValue={text} style={{minWidth:110}}>
          <InputNumber  controls={false}  min={0} onChange={()=>{calculateItemAmount(index)}}/>
        </Form.Item>
      ),
    },
    {
      title: 'RATE',
      dataIndex: 'rate',
      editable: true,
      render: (text, record, index) => (
        <Form.Item name={['items', index, 'rate']} initialValue={text} style={{minWidth:105}}>
          <InputNumber  min={0} onChange={()=>{calculateItemAmount(index)}}/>
        </Form.Item>
      ),
    },
    {
        title: 'AMOUNT',
        dataIndex: 'amount',
        editable: true,
        render: (text, record, index) => (
          <Form.Item name={['items', index, 'amount']} initialValue={text} style={{minWidth:115}}>
            <InputNumber  disabled={true} style={{backgroundColor:"white"}} min={0}
              formatter={(value) => `${Number(value).toFixed(2)}`}/>
          </Form.Item>
        ),
    },
    {   
        width:50,
        align:'center',
        render: (text, record, index) => (
            <Link onClick={() => deleteItem(index)}><DeleteOutlined/></Link>
        ),
    },
   
  ];

  return (
    <div style={{textAlign:"left", marginRight:20}}>
        <Form.Item wrapperCol={{span:24}}>
            <Input.Group>
                <Table
                    className='itemsTable'
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    bordered={true}
                />
            </Input.Group>
        </Form.Item>
        <Link onClick={handleAddRow} ><PlusOutlined/>Add another line</Link>
    </div>
  );
};

export default ItemsListTable;
