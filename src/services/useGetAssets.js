import { useEffect, useState } from "react";
import { client } from "../config/pocketbase";


const useGetAsset = () => {

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAsset();
    }, [])

    const fetchAsset = async () => {
        
        setLoading(true);
        setError(null);

        try {

            const response = await client.collection('asset').getFullList({
                sort: '-created',
                requestKey: null,
                expand: 'assigned_to'
            });
    
            // const data = await response.json();
            // console.log(data)
            setAssets(response)
    
        } catch (error) {

            setError(error.message || 'An error occurred');  // Set error message
            throw error

        } finally {

            setLoading(false)

        }
    }

    return {assets, loading, error}

};

export default useGetAsset;