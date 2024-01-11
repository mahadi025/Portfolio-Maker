export const getLoggedInUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    try {
        const user = parseJwt(token);
        return user.nameid;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

function parseJwt(token) {
    const base64Url = token.split('.')[1];

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

    return JSON.parse(jsonPayload);
};

