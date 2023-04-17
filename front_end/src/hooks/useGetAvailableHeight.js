import { useState, useEffect } from 'react';
import usePrevious from './usePrevious';

export default function useGetAvailableHeight(elementRef) {
    console.log(elementRef);
    const [availableHeight, setAvailableHeight] = useState(0);
    const previousRef = usePrevious(elementRef);
    function handleResize() {
        const { innerHeight } = window;
        const dimensions = elementRef.current?.getBoundingClientRect();
        console.log(dimensions?.bottom);
        setAvailableHeight(innerHeight - (dimensions?.bottom || 0));
    }
    useEffect(() => {
        if (JSON.stringify(elementRef.current) != JSON.stringify(previousRef?.current) ){
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [elementRef, previousRef]);
    return availableHeight;
}
