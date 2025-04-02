import React from "react";
import { Path, Svg } from "react-native-svg";

export function BackArrow({ ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            {...props}>
            <Path
                d='M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08'
                stroke='#1A1C1E'
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}

export function SecondRightArrow({ ...props }) {
    return (
        <Svg
            width={15}
            height={16}
            viewBox='0 0 15 16'
            fill='none'
            {...props}>
            <Path
                d='M5.569 12.95l4.075-4.075a1.241 1.241 0 000-1.75L5.569 3.05'
                stroke='#ACB5BB'
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}

export function LeftArrow({ ...props }) {
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

export function UpArrow({ ...props }) {
    return (
        <Svg
            width={25}
            height={24}
            viewBox='0 0 25 24'
            fill='none'
            {...props}>
            <Path
                d='M20.42 15.05L13.9 8.53c-.77-.77-2.03-.77-2.8 0l-6.52 6.52'
                stroke='#DCE4E8'
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}
