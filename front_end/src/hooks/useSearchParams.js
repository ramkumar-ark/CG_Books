import { useLocation } from "react-router-dom";

function useSearchParams(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'A';
    return {sortBy, sortOrder};
}

export default useSearchParams;
