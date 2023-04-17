import { useState, useEffect } from "react";

export default function useGetViewPortHeight(){
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return viewportHeight;
}