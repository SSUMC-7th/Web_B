import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieDetailInfo from "../components/MovieDetailInfo";
import MovieDetailPeople from "../components/MovieDetailPeople";

function MovieDetailPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const { movie } = location.state || [];

  const { data, isLoading, isError } = useCustomFetch(
    `/movie/${movieId}/credits?language=ko-KR`
  );
  const {
    data: detail,
    isLoading: detailLoading,
    isError: detailError,
  } = useCustomFetch(`/movie/${movieId}?language=ko-KR`);

  // const [people, setPeople] = useState([]);
  /*   useEffect(() => {
    const getPeople = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_MOVIE_API_URL
          }/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`, // Bearer 토큰 확인
            },
          }
        );
        setPeople(response.data?.cast);
      } catch (error) {
        "API 요청 중 오류 발생:",
          error.response ? error.response.data : error.message;
      }
    };

    getPeople();
  }, [movieId]); */

  const people = data?.data?.cast || []; // 여기서 data.results를 안전하게 가져옴
  const detailMovies = detail?.data || {};

  if (isLoading || detailLoading) {
    return <div>Loading...</div>;
  }

  if (isError || detailError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <MovieDetailInfo movie={movie} detailMovies={detailMovies} />
      <MovieDetailPeople people={people} />
    </>
  );
}

export default MovieDetailPage;
