import React, { useState } from 'react';
import { PlusOutlined } from "@ant-design/icons";
import { Table, Form, Input, Typography, Select, InputNumber } from 'antd';

const { Link } = Typography;

const ItemsListTable = ({formObj, updateTotal}) => {
  const [dataSource, setDataSource] = useState([{}]);
  const calculateItemAmount = (index) => {
      const items = formObj.getFieldValue('items');
      const {itemQuantity, itemRate} = items[index];
      const totalAmount = Number(itemQuantity) * Number(itemRate);
      items[index].itemAmount = String(totalAmount.toFixed(2));
      let total = items.reduce((acc, item) => acc + Number(item.itemAmount), 0);
      total = Number(total).toFixed(2);
      formObj.setFieldsValue({'items':items});
      updateTotal("subTotal", total);
  };

  const handleAddRow = () => {
    setDataSource([...dataSource, {}]);
  };

  const columns = [
    {
      title: 'ITEM DETAILS',
      dataIndex: 'itemDetails',
      editable: true,
      render: (text, record, index) => (
        <>
        <Form.Item name={['items', index, 'itemDetails']} initialValue={text} rules={[{required: true, message: "Please type description or item name"}]}>
            <Input.TextArea placeholder='Type an item.' style={{minWidth:'390px'}}/>
        </Form.Item>
        {/* <Form.Item name={['items', index, 'salesAccount']} initialValue={text} label='Sales Account'>
            <Input/>
        </Form.Item> */}
        </>
      ),
    },
    {
      title: 'QUANTITY',
      dataIndex: 'itemQuantity',
      editable: true,
      render: (text, record, index) => (
        <Form.Item name={['items', index, 'itemQuantity']} initialValue={text}>
          <InputNumber  controls={false} onChange={() => calculateItemAmount(index)} min={0}/>
        </Form.Item>
      ),
    },
    {
      title: 'RATE',
      dataIndex: 'itemRate',
      editable: true,
      render: (text, record, index) => (
        <Form.Item name={['items', index, 'itemRate']} initialValue={text}>
          <InputNumber onChange={() => calculateItemAmount(index)} min={0}/>
        </Form.Item>
      ),
    },
    {
        title: 'AMOUNT',
        dataIndex: 'amount',
        editable: true,
        render: (text, record, index) => (
          <Form.Item name={['items', index, 'itemAmount']} initialValue={text}>
            <InputNumber  disabled={true} style={{backgroundColor:"white"}} min={0}
              formatter={(value) => `${Number(value).toFixed(2)}`}/>
          </Form.Item>
        ),
    },
    // {
    //     title: 'SALES ACCOUNT',
    //     dataIndex: 'salesAccount',
    //     render: (text, record, index) => (
    //       <Form.Item name={['items', index, 'salesAccount']} initialValue={text}>
    //         <Input />
    //       </Form.Item>
    //     ),
    // },
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
        <Link onClick={handleAddRow}><PlusOutlined/>Add another line</Link>
    </div>
  );
};

export default ItemsListTable;
