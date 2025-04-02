import React, { useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from "react-native-reanimated";

interface ProgressCircleProps {
    size: number;
    color?: string;
    progress: number;
    backgroundColor?: string;
    duration?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressCircle = ({ size, color, progress, backgroundColor, duration = 2000 }: ProgressCircleProps) => {
    const radius = (size - 10) / 2;
    const strokeWidth = size / 9;
    const circumference = 2 * Math.PI * radius;

    const animatedProgress = useSharedValue(0);

    useEffect(() => {
        animatedProgress.value = withTiming(progress, {
            duration,
            easing: Easing.out(Easing.linear),
        });
    }, [progress, duration]);

    const animatedProps = useAnimatedProps(() => {
        const strokeDashoffset = circumference - (animatedProgress.value / 100) * circumference;
        return {
            strokeDashoffset,
        };
    });

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
                stroke={backgroundColor || "#d3d3d3"}
                strokeWidth={strokeWidth}
                fill='none'
            />
            <AnimatedCircle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color || "#4caf50"}
                strokeWidth={strokeWidth}
                fill='none'
                strokeDasharray={circumference}
                animatedProps={animatedProps}
                strokeLinecap='round'
            />
        </Svg>
    );
};

export default ProgressCircle;
