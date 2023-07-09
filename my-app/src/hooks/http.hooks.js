import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    // eslint-disable-next-line
    const getResource = useCallback( async(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true);
        try{
            const request = await fetch(url, {method, body, headers});

            if (!request.ok) {
                throw new Error(`Could not fetch ${url}, status: ${request.status}`);
            }

            const data = await request.json();
            setLoading(false);
            return data;
        } catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    })
    const clearError = useCallback(()=> setError(null), [])
    return{loading, error, getResource, clearError}
}
export default useHttp;