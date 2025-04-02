import React from "react";
import { Path, Svg } from "react-native-svg";

export function DiscoverIcon({ ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            {...props}>
            <Path
                d='M17.8 2.1L7.87 4.59c-1.45.36-2.92 1.83-3.28 3.28L2.1 17.8c-.75 3 1.09 4.85 4.1 4.1l9.93-2.48c1.44-.36 2.92-1.84 3.28-3.28L21.9 6.2c.75-3-1.1-4.85-4.1-4.1z'
                stroke='#6C7278'
                strokeWidth={1.5}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z'
                stroke='#6C7278'
                strokeWidth={1.5}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}

export function ActiveDiscoverIcon({ ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            {...props}>
            <Path
                d='M20.98 3.02a3.43 3.43 0 00-3.29-.91l-9.8 2.45a4.56 4.56 0 00-3.33 3.33L2.11 17.7c-.3 1.19.04 2.42.91 3.29.66.65 1.53 1.01 2.43 1.01.28 0 .57-.03.85-.11l9.81-2.45a4.56 4.56 0 003.33-3.33l2.45-9.81c.3-1.19-.04-2.42-.91-3.28zM12 15.88c-2.14 0-3.88-1.74-3.88-3.88 0-2.14 1.74-3.88 3.88-3.88 2.14 0 3.88 1.74 3.88 3.88 0 2.14-1.74 3.88-3.88 3.88z'
                fill='#1A1C1E'
            />
        </Svg>
    );
}
