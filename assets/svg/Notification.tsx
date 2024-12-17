import React from "react";
import { Path, Svg } from "react-native-svg";

export default function NotificationIcon() {
    return (
        <Svg
            width={28}
            height={28}
            viewBox='0 0 26 26'
            fill='none'>
            <Path
                d='M12.918 3.959c-3.557 0-6.448 2.811-6.448 6.27v3.02c0 .638-.28 1.61-.613 2.154l-1.236 1.996c-.763 1.233-.236 2.602 1.16 3.062a23.088 23.088 0 0014.262 0c1.3-.418 1.87-1.913 1.16-3.062l-1.235-1.996c-.323-.544-.602-1.516-.602-2.153v-3.02c0-3.45-2.902-6.271-6.448-6.271z'
                stroke='#1A1C1E'
                strokeWidth={2}
                strokeMiterlimit={10}
                strokeLinecap='round'
            />
            <Path
                d='M14.905 4.262a7.456 7.456 0 00-3.976 0 2.133 2.133 0 011.988-1.317c.903 0 1.677.544 1.989 1.317z'
                stroke='#1A1C1E'
                strokeWidth={2}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M16.141 20.837c0 1.725-1.45 3.136-3.224 3.136a3.282 3.282 0 01-2.278-.92 3.103 3.103 0 01-.946-2.216'
                stroke='#1A1C1E'
                strokeWidth={2}
                strokeMiterlimit={10}
            />
        </Svg>
    );
}
