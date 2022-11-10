const DotsDouble = (props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 28" {...props}>
            <g fill="#FFFFFF" fillOpacity="0.4" fillRule="evenodd">
                <circle cx="2" cy="2" r="2" fill="#FFFFFF" fillOpacity="0.4"></circle>
                <circle cx="2" cy="10" r="2" fill="#FFFFFF" fillOpacity="0.4"></circle>
                <circle cx="2" cy="18" r="2" fill="#FFFFFF" fillOpacity="0.4"></circle>
                <circle cx="2" cy="26" r="2" fill="#FFFFFF" fillOpacity="0.4"></circle>
                <circle cx="10" cy="18" r="2" fill="#FFFFFF" fillOpacity="0.4"></circle>
                <circle cx="10" cy="10" r="2" fill="#FFFFFF" fillOpacity="0.4"></circle>
                <circle cx="10" cy="2" r="2" fill="#FFFFFF" fillOpacity="0.4"></circle>
                <circle cx="10" cy="26" r="2" fill="#FFFFFF" fillOpacity="0.4"></circle>
            </g>
        </svg>
    )
}

export default DotsDouble