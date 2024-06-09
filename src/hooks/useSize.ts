import {useCallback, useEffect, useState} from "react";

export interface ISize {
    width: number;
    height: number;
    devicePixelRatio: number;
}
const useSize = ()=>{
    const [size, setSize] = useState<ISize>({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio
    });

    const updateSize = useCallback(() => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio
        });
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    return {innerWidth:size.width, innerHeight: size.height, devicePixelRatio: window.devicePixelRatio};

}

export default useSize