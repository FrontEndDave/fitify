import React from "react";
import { Path, Svg } from "react-native-svg";

export function PlayIcon({ ...props }) {
    return (
        <Svg
            width={15}
            height={14}
            viewBox='0 0 15 14'
            fill='none'
            {...props}>
            <Path
                d='M10.702 5.6L3.767 9.783a.616.616 0 01-.934-.525V4.59c0-2.036 2.2-3.308 3.967-2.293l2.677 1.54 1.22.7c.402.24.408.823.005 1.062zM11.053 9.018L8.69 10.383l-2.357 1.36a2.306 2.306 0 01-2.496-.105c-.339-.234-.298-.753.058-.963l7.414-4.445c.35-.21.811-.012.875.39.146.905-.227 1.88-1.131 2.398z'
                fill='#fff'
            />
        </Svg>
    );
}

export function PauseIcon({ ...props }) {
    return (
        <Svg
            width={33}
            height={32}
            viewBox='0 0 33 32'
            fill='none'
            {...props}>
            <Path
                d='M14.7 25.48V6.52c0-1.8-.76-2.52-2.68-2.52H7.18C5.26 4 4.5 4.72 4.5 6.52v18.96c0 1.8.76 2.52 2.68 2.52h4.84c1.92 0 2.68-.72 2.68-2.52zM28.5 25.48V6.52c0-1.8-.76-2.52-2.68-2.52h-4.84c-1.907 0-2.68.72-2.68 2.52v18.96c0 1.8.76 2.52 2.68 2.52h4.84c1.92 0 2.68-.72 2.68-2.52z'
                fill='#fff'
            />
        </Svg>
    );
}
