import { useHistory } from "react-router-dom"
import { Button } from "antd";

export default function FormFooter({formObj, isEdit}){
    const history = useHistory();
    return (
    <div style={{position:'sticky', bottom:0, backgroundColor:"whitesmoke", borderTop:"2px outset", display:"flex", alignContent:"center", justifyContent:"flex-start",padding:"12px"}}>                
        <Button onClick={() => {formObj.submit()}} type='primary'>
            {isEdit ? 'Update' : 'Save'}
        </Button>
        <Button type='secondary' onClick={() => {history.goBack()}} style={{borderColor: "#ddd", margin:"0 10px"}}>Cancel</Button>
    </div>
    );
}