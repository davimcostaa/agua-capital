"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container, Header, Main, Marker, OptionPersonalized, PersonalizedSelect, Ruler, Titulo, Water } from "./styles";

interface IReservatorio {
  _id: string;
  descoberto: {
      cota: string;
      volumeHm: string;
      volumePorc: string;
      data: string;
  };
  santaMaria: {
      cota: string;
      volumeHm: string;
      volumePorc: string;
      data: string;
  };
}

interface Dados {
  data: IReservatorio[];
}

export default function Home() {

  const array = [97, 95, 93, 87, 85, 83, 77, 75, 73, 67, 65, 63, 57, 55, 53, 47, 45, 43, 37, 35, 33, 27, 25, 23, 17, 15, 13, 0.7, 0.5, 0.3]
  const bigNumbers = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

  const [elementHeight, setElementHeight] = useState<number>();
  const [reservatoriesInformation, setReservatoriesInformation] = useState<Dados>();
  const [originalValue, setOriginalValue] = useState<string | undefined>('');

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('/api/statistics/');
        const data = await response.json();
        console.log(data)
        setReservatoriesInformation(data);

    };

    fetchData();
  }, []);

  useEffect(() => {
    discoverHeight();
  }, [reservatoriesInformation])


  function discoverHeight() {

    const lastRegister = reservatoriesInformation?.data.slice(-1)[0];
    setOriginalValue(lastRegister?.santaMaria.volumePorc);
    if (originalValue !== undefined) {
      let parsedValue = parseInt(originalValue);
      let ultimoDigito = parsedValue.toString().charAt(parsedValue.toString().length - 1);

      if (ultimoDigito == '1' || ultimoDigito == '9') {
        parsedValue = parsedValue - 1
      }
  
      const myElement = document.getElementById(`${parsedValue}`);
  
      if (myElement) {
        const { top } = myElement.getBoundingClientRect();
        const pageHeight = document.documentElement.scrollHeight;
        console.log(pageHeight)
        const elementDistance = pageHeight - top;
        if (elementDistance) {
          setElementHeight(elementDistance)
        }
      }  
    } 
  }

  return (
    <Main>
     <Header>
        <Titulo>Barragem de Santa Maria</Titulo>
        <PersonalizedSelect>
          <OptionPersonalized>
            Descoberto
          </OptionPersonalized>
          <OptionPersonalized>
            Santa Maria
          </OptionPersonalized>
        </PersonalizedSelect>
      </Header>
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
                    <Marker key={Math.random()}>
                    {array.filter(num => (
                      num.toString()[0] == (number - 1).toString()[0] && number != 10
                    ))
                      .map((num) => (
                          <>
                            <span id={(num + 1).toString()} key={num + 1}></span>
                            <span id={num.toString()} key={num}> &mdash;</span>
                            <span id={(num - 1).toString()} key={num - 1}></span>
                        </>
                      ))}
                    </Marker>
                </>  
            );
          })}
        </Ruler>
        <Water elementheight={elementHeight}>
          <div>
            <Image src="/arrow.png" alt="" width={25} height={25}  />
            <h3>{originalValue}</h3>
          </div>
        </Water>
      </Container>
    </Main>
  );
}
