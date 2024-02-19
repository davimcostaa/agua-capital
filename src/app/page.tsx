"use client"
import { useEffect, useState } from "react";
import { Container, Marker, Ruler, Water } from "./styles";

export default function Home() {

  const array = [97, 95, 93, 87, 85, 83, 77, 75, 73, 67, 65, 63, 57, 55, 53, 47, 45, 43, 37, 35, 33, 27, 25, 23, 17, 15, 13, 0.7, 0.5, 0.3]
  const bigNumbers = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

  const testPorc = 50
  const [elementHeight, setElementHeight] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('/api/statistics/');
        const data = await response.json();
        console.log(data);
        discoverHeight();
    };

    fetchData();
}, []);


  function discoverHeight() {
    
    const myElement = document.getElementById(`${testPorc}`);

    if (myElement) {
      const { bottom } = myElement.getBoundingClientRect();
      const pageHeight = window.innerHeight;
      const elementDistance = pageHeight - bottom;
      if (elementDistance) {
        setElementHeight(elementDistance)
      }
    }    
  }

  return (
    <>
      <Container>
        <Ruler>
        {bigNumbers.map((number) => {
            return (
                <>
                    <p 
                      id={number.toString()}
                      key={number}>
                        {number}
                    </p>
                    <Marker>
                    {array.filter(num => (
                      num.toString()[0] == (number - 1).toString()[0] && number != 10
                    ))
                      .map((num) => <span id={num.toString()} key={num}> &mdash;</span>)}
                    </Marker>
                </>  
            );
          })}
        </Ruler>
        <Water elementheight={elementHeight} />
      </Container>
    </>
  );
}
