import { useGetSelectedOrgQuery } from "../service/appApi";
import useAuthentication from "../useAuthentication";
import { useContext } from "react";

function useSelectedOrg() {
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    const {data} = useGetSelectedOrgQuery(user.id);
    const selectedOrg = data?.selectedOrg || {'_id': undefined, userId:user.id};
    return {...selectedOrg, userId:user.id};
}

export default useSelectedOrg;
