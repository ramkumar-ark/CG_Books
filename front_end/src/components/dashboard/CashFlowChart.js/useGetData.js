import { useGetCashFlowMonthlyDataQuery } from "../../../service/transactionsApi";
import useSelectedOrg from "../../../hooks/useSelectedOrg";
import { useCallback, useEffect, useState } from "react";
import usePrevious from "../../../hooks/usePrevious";
import {periodOptions} from "../periodData";
import DataManager from "./DataManager";

const periodDataInstances = {};
for (const option of periodOptions) {
    periodDataInstances[option.value] = new DataManager(option.value);
}

export default function useGetData() {
    const {'_id': orgId, 'createdOn': opBalDate} = useSelectedOrg();
    const {data} = useGetCashFlowMonthlyDataQuery({params:{orgId}}, {skip:!orgId});
    const [componentData, setComponentData] = useState();
    const onPeriodChange = useCallback(function(option) {
        const periodData = periodDataInstances[option];
        periodData.mergeData(data, opBalDate);
        setComponentData(periodData.getRequiredData());
        }, [data, opBalDate]
    );
    const prevdata = usePrevious(data);
    useEffect(() => {(!prevdata && data) && onPeriodChange('ltm')}, [data, prevdata, onPeriodChange]);
    return [componentData, onPeriodChange];
}


