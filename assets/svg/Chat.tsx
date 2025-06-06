import React from "react";
import { Path, Svg } from "react-native-svg";

export function ChatIcon({ ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            {...props}>
            <Path
                d='M22 6.25v5.1c0 1.27-.42 2.34-1.17 3.08-.74.75-1.81 1.17-3.08 1.17v1.81c0 .68-.76 1.09-1.32.71l-.97-.64c.09-.31.13-.65.13-1.01V12.4c0-2.04-1.36-3.4-3.4-3.4H5.4c-.14 0-.27.01-.4.02V6.25C5 3.7 6.7 2 9.25 2h8.5C20.3 2 22 3.7 22 6.25z'
                stroke='#6C7278'
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M15.59 12.4v4.07c0 .36-.04.7-.13 1.01-.37 1.47-1.59 2.39-3.27 2.39H9.47l-3.02 2.01a.671.671 0 01-1.05-.56v-1.45c-1.02 0-1.87-.34-2.46-.93-.6-.6-.94-1.45-.94-2.47V12.4c0-1.9 1.18-3.21 3-3.38.13-.01.26-.02.4-.02h6.79c2.04 0 3.4 1.36 3.4 3.4z'
                stroke='#6C7278'
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}

export function ActiveChatIcon({ ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            {...props}>
            <Path
                d='M15.59 12.4v4.07c0 .36-.04.7-.13 1.01-.37 1.47-1.59 2.39-3.27 2.39H9.47l-3.02 2.01a.671.671 0 01-1.05-.56v-1.45c-1.02 0-1.87-.34-2.46-.93-.6-.6-.94-1.45-.94-2.47V12.4c0-1.9 1.18-3.21 3-3.38.13-.01.26-.02.4-.02h6.79c2.04 0 3.4 1.36 3.4 3.4z'
                fill='#292D32'
            />
            <Path
                d='M17.75 15.6c1.27 0 2.34-.42 3.08-1.17.75-.74 1.17-1.81 1.17-3.08v-5.1C22 3.9 20.1 2 17.75 2h-8.5C6.9 2 5 3.9 5 6.25V7c0 .28.22.5.5.5h6.69c2.71 0 4.9 2.19 4.9 4.9v2.7c0 .28.22.5.5.5h.16z'
                fill='#292D32'
            />
        </Svg>
    );
}
