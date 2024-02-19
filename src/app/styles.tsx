import styled, { keyframes } from "styled-components"

interface KeyFrameProps {
    elementheight: number | undefined;
}

const WaterRise = (elementHeight: number | undefined) => keyframes`
    0% {
        height: 0%;
    }
    100% {
        height: calc(${elementHeight}px + 6px);
    }
`;

const Wave = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(5px);
    }
`

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color:#011F4B;

    // @media (max-width: 640px) {
    //   width: 100vw;
    // }
`

export const Ruler = styled.aside`
    background-color: #F86F03;
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1;
    width: 100px;
    padding-right: 2px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: white;
    direction: rtl;
    justify-content: space-around;
    height: 100vh;

    > p {
        font-size: 17px;
        margin: 0;
        display: flex;
        align-items: center;

        &::before {
            content: ''; 
            display: block; 
            width: 50%;
            height: 85%; 
            background-color: white;
            margin-left: 2px;
          }
    }

`
export const Marker = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0px;

    > span {
        font-size: 8px;
        margin: 0;
        color: white;
        font-weight: bolder;
        padding: 0;
    }
`


export const Water = styled.div<KeyFrameProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: #b3cde0; 
    animation: ${({ elementheight }) => WaterRise(elementheight)} 5s ease forwards, ${Wave} 2s ease-in-out infinite;
    transform-origin: bottom;
`

