import React from "react";
import { Defs, Image, Path, Pattern, Svg, Use } from "react-native-svg";

export default function PersonLiftingWeights({ ...props }) {
    return (
        <Svg
            width={14}
            height={14}
            viewBox='0 0 14 14'
            fill='none'
            {...props}>
            <Path
                fill='url(#pattern0_1719_2643)'
                d='M0 0H14V14H0z'
            />
            <Defs>
                <Pattern
                    id='pattern0_1719_2643'
                    patternContentUnits='objectBoundingBox'
                    width={1}
                    height={1}>
                    <Use
                        xlinkHref='#image0_1719_2643'
                        transform='scale(.01389)'
                    />
                </Pattern>
                <Image
                    id='image0_1719_2643'
                    width={72}
                    height={72}
                    xlinkHref='data:image/png;base64,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'
                />
            </Defs>
        </Svg>
    );
}
