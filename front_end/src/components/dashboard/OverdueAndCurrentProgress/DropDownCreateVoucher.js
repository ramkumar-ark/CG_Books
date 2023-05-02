import { PlusCircleFilled } from "@ant-design/icons";
import { Dropdown, Typography } from "antd";

const {Link} = Typography;

const DropDownCreateVoucher = ({dropDownOptions}) => {
    return (
        <Dropdown menu={{items:dropDownOptions}} trigger={['click']}>
            <Link><PlusCircleFilled/> New</Link>
        </Dropdown>
    );
};

export default DropDownCreateVoucher;
