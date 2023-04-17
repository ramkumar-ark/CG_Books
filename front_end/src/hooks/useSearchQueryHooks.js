import { useHistory, useLocation } from "react-router-dom";

export function useUrlQueryOptions(queryType) {
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const queryConstructor = getQueryConstructorObject(queryType, searchParams);
    const urlQueryOptions = queryConstructor.getUrlQueryOptions();
    return urlQueryOptions;
}

export function useChangeUrlQueryParams(queryType) {
    const history = useHistory();
    const {pathname, search} = useLocation();
    const searchParams = new URLSearchParams(search);

    const queryConstructor = getQueryConstructorObject(queryType, searchParams);
    
    function changeUrlQueryParams(option) {
        queryConstructor.modifyParams(option);
        const path = `${pathname}?${searchParams.toString()}`;
        history.push(path);
    };

    return changeUrlQueryParams;
}

function getQueryConstructorObject(queryType, searchParams){
    switch (queryType) {
        case 'filter':
            return new FilterQueryConstructor(searchParams);
            break;
        case 'sort':
            return new SortQueryConstructor(searchParams);
        default:
            throw new Error(`Invalid query type: ${queryType}`);
            break;
    }
}

class FilterQueryConstructor {
    constructor(searchParams) {
      this.searchParams = searchParams;
    }
  
    modifyParams(option) {
      this.searchParams.set("filterBy", option);
    }
  
    getUrlQueryOptions() {
      return [this.searchParams.get("filterBy")];
    }
}

class SortQueryConstructor {
    constructor(searchParams) {
        this.searchParams = searchParams;
    }

    modifyParams(option) {
        if (this.searchParams.get('sortBy') === option) 
            this.searchParams.set('sortOrder', this.searchParams.get('sortOrder') === 'A' ? 'D' : 'A');
        else {
            this.searchParams.set('sortOrder', 'A');
            this.searchParams.set('sortBy', option);
        }
    }

    getUrlQueryOptions() {
        return [this.searchParams.get('sortBy'), this.searchParams.get('sortOrder')==='A' ? 1 : -1];
    }
}