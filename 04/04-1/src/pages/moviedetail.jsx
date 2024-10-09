import styled from "styled-components";
import { useLocation } from "react-router-dom";
import useDetailFetch from "../hooks/useDetailFetch";

const MovieDetail = () => {
    const location = useLocation();
    const { movieID } = location.state || {};
    const {data:movie, isLoading, isError} = useDetailFetch(`/${movieID}?language=ko-KR`);
    const {data:people, isLoadingP, isErrorP} = useDetailFetch (`/${movieID}/credits?language=ko-KR`);
    
    const removeDuplicates = (array) => {
        const uniqueIds = new Set(); 
        return array.filter(person => {
            if (uniqueIds.has(person.id)) {
                return false;
            } else {
                uniqueIds.add(person.id); 
                return true;
            }
        });
    };

    if (isLoading||isLoadingP) {
        return <div>
            <StyledLoad>로딩 중 입니다.... 좀만 기다려줘잉</StyledLoad>
        </div>
    }

    if (isError||isErrorP) {
        return <div>
            <StyledError>에러 떴어요 비상비상!!!!!</StyledError>
        </div>
    }

    return (
        <>
        {movie.legnth!=0 && people.length!=0 &&
            <Container>
                {movie.length!=0 &&
                    <MovieInfo>
                        <Poster src={`https://image.tmdb.org/t/p/w500${movie.data.poster_path}`} alt={movie.data.title} />
                        <MovieDetails>
                            <Title>{movie.data.title}</Title>
                            <Rating>평점: {movie.data.vote_average}</Rating>
                            <Runtime>상영 시간: {movie.data.runtime} 분</Runtime>
                            <Overview>개요: {movie.data.overview}</Overview>
                            <Tagline>{movie.data.tagline}</Tagline>
                        </MovieDetails>
                    </MovieInfo>
                }
                <CastList>
                    <StyledText>출연</StyledText>
                        <StyledUl>
                            {removeDuplicates(people.data?.cast).map((person) => (
                                <CastItem key={person.id}>
                                    <ProfileImage
                                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                        alt={person.name}
                                    />
                                    <div>
                                        <Name>{person.name}</Name>
                                        <Character>역할: {person.character}</Character>
                                    </div>
                                </CastItem>
                            ))}
                        </StyledUl>
                        <StyledText>감독</StyledText>
                        <StyledUl>
                            {removeDuplicates(people.data?.crew).map((person) => (
                                <CastItem key={person.id}>
                                    <ProfileImage
                                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                        alt={person.name}
                                    />
                                    <div>
                                        <Name>{person.name}</Name>
                                        <Character>역할: {person.known_for_department}</Character>
                                    </div>
                                </CastItem>
                        ))}
                        </StyledUl>
                </CastList>
            </Container>
        }
        </>
    );
};

export default MovieDetail;

const StyledLoad = styled.h1`
    color: white;
`

const StyledError = styled.h1`
    color: white;
`

const StyledUl = styled.ul`
    display: flex;
    flex-wrap : wrap;
    gap: 20px;
    padding: 0px;
    width: 100%;
    box-sizing: border-box;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 20px;
`;

const MovieInfo = styled.div`
    display: flex;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 40px;
`;

const Poster = styled.img`
    width: 300px;
    height: auto;
    margin-right: 20px;
`;

const MovieDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 36px;
    margin-bottom: 20px;
    color: white;
`;

const Rating = styled.p`
    font-size: 18px;
    margin-bottom: 10px;
    color: white;
`;

const Runtime = styled.p`
    font-size: 18px;
    margin-bottom: 10px;
    color: white;
`;

const Overview = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
    color: white;
`;

const Tagline = styled.p`
    font-size: 18px;
    font-style: italic;
    color: #555;
    margin-bottom: 20px;
`;

const CastList = styled.div`
    width: 100%;
    max-width: 1000px;
`;

const CastItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    list-style: none;
`;

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
`;

const Name = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: white;
`;

const Character = styled.p`
    font-size: 16px;
    color: #777;
`;

const StyledText = styled.h1`
    color: white;
`