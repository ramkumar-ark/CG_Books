import React, { useState } from 'react';
import { PlusOutlined } from "@ant-design/icons";
import { Table, Form, Input, Typography, Select } from 'antd';

const { Link } = Typography;

const EditableTable = () => {
  const [dataSource, setDataSource] = useState([{}]);

  const handleAddRow = () => {
    setDataSource([...dataSource, {}]);
  };

  const columns = [
    {
      title: 'Salutation',
      dataIndex: 'salutation',
      editable: true,
      render: (text, record, index) => (
        <Form.Item name={['contacts', index, 'salutation']} initialValue={text}>
            <Select 
                placeholder="Salutation"
                options={[
                    {label:"Mr.", value:"Mr."},
                    {label:"Mrs.", value:"Mrs."},
                    {label:"Ms.", value:"Ms."},
                    {label:"Miss.", value:"Miss."},
                    {label:"Dr.", value:"Dr."},
                ]}
            />
        </Form.Item>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      editable: true,
      render: (text, record, index) => (
        <Form.Item name={['contacts', index, 'firstName']} initialValue={text}>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      render: (text, record, index) => (
        <Form.Item name={['contacts', index, 'lastName']} initialValue={text}>
          <Input />
        </Form.Item>
      ),
    },
    {
        title: 'Email Address',
        dataIndex: 'email',
        render: (text, record, index) => (
          <Form.Item name={['contacts', index, 'email']} initialValue={text}>
            <Input />
          </Form.Item>
        ),
    },
    {
        title: 'Work Phone',
        dataIndex: 'workPhone',
        render: (text, record, index) => (
          <Form.Item name={['contacts', index, 'workPhone']} initialValue={text}>
            <Input />
          </Form.Item>
        ),
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
        render: (text, record, index) => (
          <Form.Item name={['contacts', index, 'mobile']} initialValue={text}>
            <Input />
          </Form.Item>
        ),
    },
  ];

  return (
    <div style={{textAlign:"left"}}>
        <Form.Item wrapperCol={{span:24}}>
            <Input.Group>
                <Table
                    className='contactsTable'
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    bordered={true}
                />
            </Input.Group>
        </Form.Item>
        <Link onClick={handleAddRow}><PlusOutlined/>Add Contact Person</Link>
    </div>
  );
};

export default EditableTable;
