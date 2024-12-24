import React from "react";
import { Path, Svg } from "react-native-svg";

export default function LeftArrow({ ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            {...props}>
            <Path
                d='M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08'
                stroke={props.color ? props.color : "#fff"}
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}
