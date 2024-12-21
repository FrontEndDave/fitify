import React from "react";
import Svg, { Circle } from "react-native-svg";
import Colors from "@/constants/Colors";

interface ProgressCircleProps {
    size: number;
    progress: number;
    backgroundColor?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ size, progress, backgroundColor }) => {
    const radius = (size - 10) / 2;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{ transform: [{ rotate: "-90deg" }] }}>
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={backgroundColor ? backgroundColor : Colors.secondary_400}
                strokeWidth={strokeWidth}
                fill='none'
            />
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={Colors.success_400}
                strokeWidth={strokeWidth}
                fill='none'
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap='round'
            />
        </Svg>
    );
};

export default ProgressCircle;
