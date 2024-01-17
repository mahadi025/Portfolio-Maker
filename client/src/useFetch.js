import { useEffect, useState } from "react";
import axios from 'axios';
import { getLoggedInUserToken } from "./auth";


const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getLoggedInUserToken();
                console.log(token);

                const headers = token
                    ? {
                        Authorization: `Bearer ${token}`,
                    }
                    : {};

                const response = await axios.get(url, { headers });

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                const responseData = response.data;
                setData(responseData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;