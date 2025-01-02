import React from "react";
import { Path, Svg } from "react-native-svg";

export function IncompleteIcon({ ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            {...props}>
            <Path
                d='M12 21a9 9 0 100-18 9 9 0 000 18z'
                fill={props.color ? props.color : "#FFF"}
                stroke={props.color ? props.strokeColor : "#ACB5BB"}
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}

export function CompleteIcon({ ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            {...props}>
            <Path
                d='M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm4.78 7.7l-5.67 5.67a.75.75 0 01-1.06 0l-2.83-2.83a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06z'
                fill={props.color ? props.color : "#00D68F"}
            />
        </Svg>
    );
}
