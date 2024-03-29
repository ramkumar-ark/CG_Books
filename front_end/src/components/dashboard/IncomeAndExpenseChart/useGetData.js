import { useGetMonthlyIncomeAndExpenseQuery } from "../../../service/transactionsApi";
import useSelectedOrg from "../../../hooks/useSelectedOrg";
import { useCallback, useEffect, useState } from "react";
import usePrevious from "../../../hooks/usePrevious";
import {periodOptions2 as periodOptions} from "../periodData";
import DataManager from "./DataManager";

const periodDataInstances = {};
for (const option of periodOptions) {
    periodDataInstances[option.value] = new DataManager(option.value);
}

export default function useGetData() {
    const {'_id': orgId} = useSelectedOrg();
    const {data} = useGetMonthlyIncomeAndExpenseQuery({params:{orgId}}, {skip:!orgId});
    const [componentData, setComponentData] = useState();
    const onPeriodChange = useCallback(function(option) {
        const periodData = periodDataInstances[option];
        periodData.mergeData(data);
        setComponentData(periodData.getRequiredData());
        }, [data]
    );
    const prevdata = usePrevious(data);
    useEffect(() => {(!prevdata && data) && onPeriodChange('ltm')}, [data, prevdata, onPeriodChange]);
    return [componentData, onPeriodChange];
}
