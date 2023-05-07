import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory, useLocation, useParams } from "react-router-dom";

const NewButton = ({buttonText}) => {
    const {pathname} = useLocation();
    const history = useHistory();
    const {transactionId, entityId} = useParams();
    const onClick = () => {history.push(`${pathname.replace(`/${transactionId || entityId}`, '')}/new`)};
    return (
        <Button type="primary" onClick={onClick} style={{padding:'4px 5px'}}><PlusOutlined/> 
            {buttonText || 'New'} 
        </Button>
    );
};

export default NewButton;
