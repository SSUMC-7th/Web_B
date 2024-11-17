import styled from "styled-components"

const MovieItem = styled.li`
    margin: 10px;
    text-align: center;
`;

const MovieTitle = styled.h3`
    color: white;
    margin-top: 10px;
`;

const MovieDay = styled.div`
    color: gray;
    margin-top: 5px;
`;

const Movieimg = styled.img`
    border-radius: 12px;
    transition: transform 0.2s ease-in-out;
    &:hover{
        transform: scale(1.05);
        filter: brightness(0.5);
    }    
`;

const StyledLoad = styled.h1`
    color: white;
`

const StyledError = styled.h1`
    color: white;
`

const MovieList = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 40px;
    padding: 0 20px;
    max-width: 100%;
    box-sizing: border-box;
`;

const ErrorContainer = styled.div`
    margin-top: 30px;
    text-align: center;
`

const ErrorText = styled.h1`
    color: white;
`

export {MovieList, MovieItem, MovieTitle, MovieDay, Movieimg, StyledLoad, StyledError, ErrorContainer, ErrorText}