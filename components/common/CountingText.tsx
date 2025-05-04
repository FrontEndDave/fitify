import { useEffect, useState } from "react";
import { Text as RNText } from "react-native";
import Animated, { Easing, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedText = Animated.createAnimatedComponent(RNText);

type CountingTextProps = {
    value: string;
    customStyle?: string;
};

export default function CountingText({ value, customStyle }: CountingTextProps) {
    const count = useSharedValue(0);
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        count.value = withTiming(65, {
            duration: 2000,
            easing: Easing.out(Easing.linear),
        });

        const interval = setInterval(() => {
            setDisplayValue(`${Math.round(count.value)}%`);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return <AnimatedText className={customStyle}>{displayValue}</AnimatedText>;
}
