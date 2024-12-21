import React from "react";
import { Path, Svg } from "react-native-svg";

export default function RightArrow({ ...props }) {
    return (
        <Svg
            width={19}
            height={20}
            viewBox='0 0 14 15'
            fill='none'
            {...props}>
            <Path
                d='M8.417 3.96l3.541 3.54-3.54 3.54M2.042 7.5h9.817'
                stroke={props.color ? props.color : "#6C7278"}
                strokeWidth={props.strokeWidth ? props.strokeWidth : 1.9}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}
