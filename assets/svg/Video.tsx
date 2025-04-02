import React from "react";
import { Path, Svg } from "react-native-svg";

export function VideoIcon({ ...props }) {
    return (
        <Svg
            width={12}
            height={13}
            viewBox='0 0 12 13'
            fill='none'
            {...props}>
            <Path
                d='M2 6.5V4.72c0-2.21 1.565-3.115 3.48-2.01l1.545.89 1.545.89c1.915 1.105 1.915 2.915 0 4.02l-1.545.89-1.545.89C3.565 11.395 2 10.49 2 8.28V6.5z'
                stroke={props.color ? props.color : "#6C7278"}
                strokeWidth={1.8}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}
