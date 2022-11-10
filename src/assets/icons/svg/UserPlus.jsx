const UserPlus = (props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 23 18" {...props}>
            <g fill="none" fillRule="evenodd" transform="translate(2 2)">
                <circle cx="6" cy="3" r="3" stroke="currentColor" strokeWidth="2.5px" fill="none"></circle>
                <path stroke="currentColor" strokeWidth="2.5px" d="M12 13c0-3.513-2.686-6-6-6s-6 2.534-6 6c0 1.011 12 1.043 12 0z" fill="none"></path>
                <rect width="2" height="8" x="16" y="3" fill="currentColor" rx="1" transform="rotate(90 17 7)"></rect>
                <rect width="2" height="8" x="16" y="3" fill="currentColor" rx="1" transform="rotate(-180 17 7)"></rect>
            </g>
        </svg>
    )
}

export default UserPlus