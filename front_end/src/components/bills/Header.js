import SubHeader from "../individual components/SubHeader";
import { Space } from 'antd';
import NewButton from "../individual components/NewButton";
import SortButton from "../individual components/SortButton";
import FilterTitle from "../individual components/FilterTitle";
import { useChangeUrlQueryParams, useUrlQueryOptions } from "../../hooks/useSearchQueryHooks";

const Header = ({onRefresh, sortOptionsList, filterOptionsList, titleLevel, topOffset, componentRef}) => {
    const changeUrlOnClick = useChangeUrlQueryParams('filter');
    const changeSortParams = useChangeUrlQueryParams('sort');
    const [filterOption] = useUrlQueryOptions('filter');
    const title = filterOptionsList.find(e => e.filterField === filterOption)?.label 
        || filterOptionsList[0].label;
    return (
        <SubHeader topOffset={topOffset} componentref={componentRef}>
            <FilterTitle filterOptionsList={filterOptionsList} onItemClick={changeUrlOnClick} 
                title={title} titleLevel={titleLevel}/>
            <Space>
                <NewButton/>
                <SortButton sortOptions={sortOptionsList} refetchFunction={onRefresh} 
                    onItemSelect={changeSortParams}/>
            </Space>
        </SubHeader>
    );
};

export default Header;
