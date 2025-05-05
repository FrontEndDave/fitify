import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";

export default function CountingText({ value, duration = 1000, style, formatter }) {
    const animated = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        animated.setValue(0);
        const listener = animated.addListener(({ value: v }) => {
            setDisplayValue(Math.floor(v));
        });

        Animated.timing(animated, {
            toValue: value,
            duration,
            useNativeDriver: false,
        }).start();

        return () => {
            animated.removeListener(listener);
        };
    }, [value, duration, animated]);

    const text = formatter ? formatter(displayValue) : String(displayValue);

    return <Text style={style}>{text}</Text>;
}

CountingText.propTypes = {
    value: PropTypes.number.isRequired,
    duration: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    formatter: PropTypes.func,
};
