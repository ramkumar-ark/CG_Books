import useGetBankOverviewChartData from "./useGetBankOverviewChartData";
import { useEffect, useState } from "react";
import usePrevious from "../../hooks/usePrevious";

export default function useManageChartData() {
    const {last30DaysData, last12MonthsData} = useGetBankOverviewChartData();
    const [chartData, setChartData] = useState(last30DaysData['group']);
    const onPeriodChange = ({period, dataContext})  => {
        switch (period) {
            case '12 months':
                setChartData(last12MonthsData[dataContext]);
                break;
            case '30 days':
                setChartData(last30DaysData[dataContext]);
                break;
            default:
                break;
        }
    };
    const prevData = usePrevious(last30DaysData['group']);
    useEffect(() => {
        if (prevData === undefined && last30DaysData['group']) setChartData(last30DaysData['group']);
    }, [last30DaysData]);
    return [chartData, onPeriodChange];
}