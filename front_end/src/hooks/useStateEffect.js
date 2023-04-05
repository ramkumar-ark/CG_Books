import { useEffect, useState } from "react";

function useStateEffect(prop, fn=()=>{}){
    const [state, setState] = useState(prop);
    useEffect(() => {
        if (JSON.stringify(prop)!==JSON.stringify(state)) {
            fn();
            setState(prop);
        }
    }, [prop]);
    return [state, setState];
}

export default useStateEffect;
