import React from "react";
import { Path, Svg } from "react-native-svg";

export default function More({ ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            {...props}>
            <Path
                d='M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM19 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
                stroke={props.color ? props.color : "#fff"}
                strokeWidth={1.5}
            />
        </Svg>
    );
}
