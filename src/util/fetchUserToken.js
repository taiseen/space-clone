export const fetchUserToken = () => {

    const user = localStorage.getItem('jwt') !== 'undefined'
        ? JSON.parse(localStorage.getItem('jwt'))
        : localStorage.clear()

    return user;
}