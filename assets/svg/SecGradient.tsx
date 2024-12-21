import React from "react";
import { Defs, LinearGradient, Path, Stop, Svg } from "react-native-svg";

export function SecondGradient({ ...props }) {
    return (
        <Svg
            width={"100%"}
            height={"100%"}
            preserveAspectRatio='xMinYMin cover'
            viewBox='0 0 134 110'
            fill={props.fill || "none"}
            {...props}>
            <Path
                d='M-3.906 17.2L-8 0v129h289V51.6l-4.094 4.3c-3.854 4.3-12.042 12.9-19.989 12.9-7.948 0-16.136-8.6-24.084-4.3-7.947 4.3-16.136 21.5-24.083 15.05C200.802 73.1 192.614 43 184.667 43c-7.948 0-16.136 30.1-24.084 27.95-7.947-2.15-16.135-36.55-24.083-43-7.947-6.45-16.136 15.05-24.083 32.25-7.948 17.2-16.136 30.1-24.084 32.25C80.386 94.6 72.198 86 64.25 75.25 56.303 64.5 48.114 51.6 40.167 55.9c-7.948 4.3-16.136 25.8-24.084 19.35C8.136 68.8-.053 34.4-3.906 17.2z'
                fill='url(#paint0_linear_1719_2636)'
                fillOpacity={0.7}
            />
            <Defs>
                <LinearGradient
                    id='paint0_linear_1719_2636'
                    x1={136.5}
                    y1={0}
                    x2={136.5}
                    y2={129}
                    gradientUnits='userSpaceOnUse'>
                    <Stop stopColor='#fff' />
                    <Stop
                        offset={1}
                        stopColor='#fff'
                        stopOpacity={0}
                    />
                </LinearGradient>
            </Defs>
        </Svg>
    );
}
