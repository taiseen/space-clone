const GIF = (props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="18" viewBox="0 0 29 18" {...props}>
            <g fill="none" fillRule="evenodd" transform="translate(2 2)">

                <text fill="currentColor" fontFamily="ArialRoundedMTBold, Arial Rounded MT Bold" fontSize="11">
                    <tspan x="3.101" y="11" fill="currentColor">GIF</tspan>
                </text>

                <rect width="25" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5px" rx="2" fill="none"></rect>
            </g>
        </svg>
    )
}

export default GIF