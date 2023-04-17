import { Spin } from "antd";
import Header from "./HeaderViewVendor";
import useGetDataForVendorSection from "./useGetDataForVendorSection";
import { useRef } from "react";
import TabsCustomerView from "../customers/TabsCustomerView";
import useSelectedOrg from "../../hooks/useSelectedOrg";

const ViewVendorSection = () => {
    const {vendorData, deleteVendorFunction, isDeleting} = useGetDataForVendorSection();
    const organization = useSelectedOrg();
    const headerRef = useRef();
    return (
        <Spin spinning={isDeleting || !vendorData}>
            <Header componentRef={headerRef} titleLevel={3} topOffset={0} title={vendorData?.name}
                deleteFunction={deleteVendorFunction} entityId={vendorData?.['_id']}/>
            {vendorData &&
            <TabsCustomerView customer={vendorData} headerRef={headerRef} organization={organization}/>}
        </Spin>
    );
};

export default ViewVendorSection;
