import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Search({ ...props }) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox='0 0 20 20'
            fill='none'
            {...props}>
            <Path
                d='M9.583 17.5a7.917 7.917 0 100-15.833 7.917 7.917 0 000 15.833zM18.333 18.333l-1.666-1.666'
                stroke={props.color || "#0C0507"}
                strokeWidth={1.5}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
}

export default Search;
