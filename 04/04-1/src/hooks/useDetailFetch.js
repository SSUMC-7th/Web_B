import { useEffect, useState } from "react";
import { axiosDetail } from "../api/axios-detail";

const useDetailFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const DetailData = async() => {
            setIsLoading(true);
            try{
                const response = await axiosDetail.get(url)
                setData(response);
            } catch(e) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        DetailData();
    },[url]);

    return { data, isLoading, isError }

    // useEffect(()=> {
    //     const getMovies = async () => {
    //         const data = await axiosInstance.get(url);
    //         setMovie(data);
    //     }
    //     getMovies();
    // },[]);
}

export default useDetailFetch