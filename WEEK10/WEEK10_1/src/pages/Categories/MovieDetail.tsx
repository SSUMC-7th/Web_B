import { useLocation, useParams } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";
import MovieDetailPeople from "../../components/MovieDetail/MovieDetailPeople";
import MovieDetailInfo from "../../components/MovieDetail/MovieDetailInfo";
import LoadingSpinner from "../../style/SkeletonUI";

interface Person {
  id: number;
  profile_path: string;
  name: string;
}

interface MovieDetail {
  title: string;
  vote_average: number;
  release_date?: string;
  runtime: number;
  tagline?: string;
  overview: string;
}

interface Cast {
  name: string;
  character: string;
  id: number;
  profile_path: string | null;
}

interface CreditsData {
  cast: Cast[];
}

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();
  const movie = location.state?.movie || {};

  const {
    data: creditsData,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
  } = useCustomFetch<CreditsData>(`/movie/${movieId}/credits?language=ko-KR`);
  const {
    data: detailsData,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useCustomFetch<MovieDetail>(`/movie/${movieId}?language=ko-KR`);

  const cast: Cast[] = creditsData?.cast || [];
  const movieDetails: MovieDetail = detailsData || {
    title: "",
    vote_average: 0,
    runtime: 0,
    overview: "",
  };

  const people: Person[] = cast.map(({ id, name, profile_path }) => ({
    id,
    name,
    profile_path: profile_path ? profile_path : "",
  }));

  if (isCreditsLoading || isDetailsLoading) return <Loading />;
  if (isCreditsError || isDetailsError) return <Error />;

  return (
    <>
      <MovieDetailInfo movie={movie} detailMovies={movieDetails} />
      <MovieDetailPeople people={people} />
    </>
  );
};

const Loading = () => <LoadingSpinner isLoading={true} />;

const Error = () => <div> 에러 발생 </div>;

export default MovieDetailPage;
