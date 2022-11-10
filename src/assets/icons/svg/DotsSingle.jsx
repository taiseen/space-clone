const DotsSingle = (props) => {
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="15" viewBox="0 0 3 15" {...props}>
            <g fill="currentColor" fillRule="evenodd">
                <rect width="3" height="3" y="12" rx="1.5" fill="currentColor"></rect>
                <rect width="3" height="3" y="6" rx="1.5" fill="currentColor"></rect>
                <rect width="3" height="3" rx="1.5" fill="currentColor"></rect>
            </g>
        </svg>
    )
}

export default DotsSingle