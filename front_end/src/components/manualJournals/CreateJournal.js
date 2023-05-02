import { Spin } from "antd";
import Header from "./HeaderCreateJournal";
import { useRef } from "react";
import CreateJounalForm from "./createJournalForm/CreateJournalForm";
import useGetRequiredProps from "./useGetRequiredProps";


const CreateJournal = ({}) => {
    const headerRef = useRef();
    const {initialValues, isLoading, onFormSubmit} = useGetRequiredProps();
    return (
        <Spin spinning={isLoading}>
            <Header componentref={headerRef} topOffset={0} />
            {!isLoading &&
            <CreateJounalForm onSave={onFormSubmit} initialValues={initialValues}/>}
        </Spin>
    );
};

export default CreateJournal;
