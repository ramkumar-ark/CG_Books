import Footer from "./Footer";
import Header from "../Header";
import ProgressBar from "./ProgressBar";
import DropDownCreateVoucher from "./DropDownCreateVoucher";

const OverdueAndCurrentProgress = ({title, toolTip, dropDownOptions, overdue, current, docType}) => {
    return (
      <div style={{margin:'20px 15px 0px', border:'1px solid #ebeaf2', borderRadius:10,
        backgroundColor:'#fff'}}>
        <Header title={title} toolTip={toolTip} 
            dropDownComponent={<DropDownCreateVoucher dropDownOptions={dropDownOptions}/>}/> 
        <ProgressBar documentType={docType} current={current} overdue={overdue}/>
        <Footer current={current} overdue={overdue}/>
      </div>
    );
};

export default OverdueAndCurrentProgress;
