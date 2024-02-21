import styled, { keyframes } from "styled-components"

interface KeyFrameProps {
    elementheight: number | undefined;
}

const WaterRise = (elementHeight: number | undefined) => keyframes`
    0% {
        height: 0px;
    }
    100% {
        height: calc(${elementHeight}px - 6px);   
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
    background-color: #011F4B;

    // @media (max-width: 640px) {
    //   width: 100vw;
    // }
`

export const Main = styled.section`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: 7% 93%;
`

export const Header = styled.header`
    display: flex;
    background-color: #011F4B;
    justify-content: space-around;
    align-items: center;
    padding: 2px;
`

export const Titulo = styled.h1`
    padding: 0;
    margin: 0;
    text-align: center;
    color: white;
`

export const Ruler = styled.aside`
    background-color: #F86F03;
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1;
    width: 100px;
    padding-right: 2px;
    padding-top: 2px;
    margin-bottom: 5px;
    color: white;
    direction: rtl;
    justify-content: space-between;
    height: 100%;
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

export const PersonalizedSelect = styled.select`
        appearance: none;
        border: 0;
        outline: 0;
        font: inherit;
        height: fit-content;
        width: 20rem;
        padding: 8px 16px 8px 8px;
        background: var(--arrow-down-image) no-repeat right 0.8em center / 1.4em,
        linear-gradient(to right, #06beb6, #48b1bf);
        color: white;
        border-radius: 0.25em;
        box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
        cursor: pointer;
`

export const OptionPersonalized = styled.option`
        color: black;
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
    width: 100vw;
    background-color: #b3cde0; 
    display: flex;
    padding-left: 101px;
    animation: ${({ elementheight }) => WaterRise(elementheight)} 5s ease forwards, ${Wave} 2s ease-in-out infinite;
    overflow: visible; 

    > div {
        display: flex;
        position: absolute;
        bottom: 90%; 
        left: 101;     
        align-items: center;
        height: fit-content;
        color: white;
    }
`

