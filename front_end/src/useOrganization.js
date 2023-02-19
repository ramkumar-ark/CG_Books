import React, {useState, createContext, useEffect} from "react";
import getOrgData from "./service/getOrgData";

const OrgCtx = createContext();

const useOrganization = () => {
    const [selectedOrgId, setSelectedOrgId] = useState(null);
    const [selectedOrg, setSelectedOrg] = useState();

    const selectOrganization = async (orgId) => {
        if (orgId){
            const orgObj = await getOrgData(orgId);
            console.log(orgObj);
            setSelectedOrg(orgObj);
        }
    }

    useEffect(
        () => {
            selectOrganization(selectedOrgId);
        },
        [selectedOrgId]
    );

    return {
        OrgCtx,
        OrgProvider: ({children}) => (
            <OrgCtx.Provider value={{ selectedOrg, setSelectedOrgId }}>
                {children}
            </OrgCtx.Provider>
        )
    };
};

export default useOrganization;
