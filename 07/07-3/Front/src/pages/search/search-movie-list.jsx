import useCustomFetch from "../../hooks/useCustomFetch"
import CardListSkeleton  from "../../components/skeleton/cardListSkeleton"
import * as S from "../search/searchmovie.style"
import { useSearchParams } from "react-router-dom"


const SearchMovieList = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    })

    const mq = searchParams.get('mq')
    const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`

    const {data: movies, isLoading, isError} = useCustomFetch(url);

    if (isError){
        return (
            <S.ErrorContainer>
                <S.ErrorText>에러 발생!</S.ErrorText>
            </S.ErrorContainer>
        )
    }

    if (isLoading) {
        return (
            <S.MovieList>
                <CardListSkeleton number={20}/>
            </S.MovieList>
        )
    }

    if (movies.data?.results.length === 0) {
        return(
            <S.ErrorContainer>
                <S.ErrorText>해당하는 검색어 {mq}</S.ErrorText>
                <S.ErrorText>해당하는 데이터가 없습니다!..</S.ErrorText>
            </S.ErrorContainer>
        )
    }

    return(
        <>
            <S.MovieList>
                {movies.data?.results.map(movie => (
                    <S.MovieItem key={movie.id}>
                        <S.Movieimg
                            onClick={() => navigate(`movie/:${movie.id}`,{
                                replace: false,
                                state: {movieID: movie.id}
                            })}
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            />
                        <S.MovieTitle>{movie.title}</S.MovieTitle>
                        <S.MovieDay>{movie.release_date}</S.MovieDay>
                    </S.MovieItem>
                ))}
            </S.MovieList>
        </>
    )
}

export default SearchMovieList;