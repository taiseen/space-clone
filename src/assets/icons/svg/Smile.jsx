const Smile = (props) => {

    return (

        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...props}>
            <g fill="currentColor" fillRule="nonzero" transform="translate(1 1)">
                <path stroke="currentColor" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z" fill="currentColor"></path>
                <circle cx="5.5" cy="5.5" r="1" fill="currentColor"></circle>
                <circle cx="10.5" cy="5.5" r="1" fill="currentColor"></circle>
                <path stroke="currentColor" d="M10.722 9a2.722 2.722 0 1 1-5.444 0H4.5a3.5 3.5 0 0 0 7 0h-.778z" fill="currentColor"></path>
            </g>
        </svg>
    )
}

export default Smile