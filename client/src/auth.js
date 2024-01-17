export const getLoggedInUser = () => {

    const userString = localStorage.getItem('user');



    if (!userString) {
        return null;
    }

    const user = JSON.parse(userString);

    const username = user.username;


    try {
        return username;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getLoggedInUserToken = () => {

    const userString = localStorage.getItem('user');

    if (!userString) {
        return null;
    }

    const user = JSON.parse(userString);

    const token = user.token;

    try {
        return token;
    } catch (error) {
        console.error(error);
        return null;
    }
};
