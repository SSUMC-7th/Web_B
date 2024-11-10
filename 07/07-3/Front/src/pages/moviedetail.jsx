import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useGetDetails } from "../hooks/queries/useGetDetails"
import { useGetCredits } from "../hooks/queries/useGetCredits"
import { useQuery } from "@tanstack/react-query";
import CardListSkeleton  from "../components/skeleton/cardListSkeleton"

const MovieDetail = () => {
    const location = useLocation();
    const { movieID } = location.state || {};
    const {data:people, isPendingP, isErrorP} = useQuery({
        queryFn: () => useGetCredits({ movieID: movieID }),
        queryKey: ["movieCredits", movieID],
        cacheTime: 10000,
        staleTime: 10000,
    })
    
    const {data:movie, isPending, isError} = useQuery({
        queryFn: () => useGetDetails({ movieID: movieID }),
        queryKey: ["movieDetails", movieID],
        cacheTime: 10000,
        staleTime: 10000,
    })
    
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

    if (isPending||isPendingP) {
        return (
            <SkeletonList>
                <CardListSkeleton number={20}/>
            </SkeletonList>
        )
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
                        <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <MovieDetails>
                            <Title>{movie.title}</Title>
                            <Rating>평점: {movie.vote_average}</Rating>
                            <Runtime>상영 시간: {movie.runtime} 분</Runtime>
                            <Overview>개요: {movie.overview}</Overview>
                            <Tagline>{movie.tagline}</Tagline>
                        </MovieDetails>
                    </MovieInfo>
                }
                <CastList>
                    <StyledText>출연</StyledText>
                        <StyledUl>
                            {removeDuplicates(people?.cast).map((person) => (
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
                            {removeDuplicates(people?.crew).map((person) => (
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

const SkeletonList = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 40px;
    padding: 0 20px;
    max-width: 100%;
    box-sizing: border-box;
`;