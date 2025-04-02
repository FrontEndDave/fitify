import React from "react";
import { Defs, LinearGradient, Path, Stop, Svg } from "react-native-svg";

export function Gradient({ ...props }) {
    return (
        <Svg
            width='100%'
            height='100%'
            viewBox='0 0 78 105'
            fill='none'
            {...props}
            style={props.style}>
            <Path
                d='M-13.08 18.209L-19.189.961v129.357H412V52.704l-6.109 4.312c-5.749 4.312-17.966 12.935-29.824 12.935-11.857 0-24.074-8.623-35.932-4.311-11.858 4.311-24.075 21.56-35.932 15.091-11.858-6.468-24.075-36.65-35.933-36.65-11.857 0-24.074 30.182-35.932 28.026-11.858-2.156-24.075-36.65-35.932-43.118-11.858-6.468-24.075 15.091-35.933 32.339-11.857 17.247-24.074 30.183-35.932 32.339-11.858 2.156-24.075-6.468-35.932-17.248C76.75 65.64 64.534 52.704 52.676 57.016c-11.858 4.312-24.075 25.871-35.932 19.403C4.886 69.951-7.331 35.457-13.08 18.21z'
                fill='url(#paint0_linear_23_1421)'
                fillOpacity={0.7}
            />
            <Defs>
                <LinearGradient
                    id='paint0_linear_23_1421'
                    x1={196.406}
                    y1={0.961426}
                    x2={196.406}
                    y2={130.318}
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
