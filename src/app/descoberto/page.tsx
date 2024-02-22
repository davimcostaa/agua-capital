"use client"
import { Dados, Info } from "@/interfaces/interface";
import Image from "next/image";
import { useEffect, useState } from "react";
import useDiscoverHeight from "../../hooks/useDiscoverHeight";
import { Container, Header, Main, Marker, OptionPersonalized, PersonalizedSelect, Ruler, Titulo, Water, Date } from "../../styles/styles";


export default function Home() {

  const array = [97, 95, 93, 87, 85, 83, 77, 75, 73, 67, 65, 63, 57, 55, 53, 47, 45, 43, 37, 35, 33, 27, 25, 23, 17, 15, 13, 0.7, 0.5, 0.3]
  const bigNumbers = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

  const [reservatoriesInformation, setReservatoriesInformation] = useState<Dados>();
  const [elementInfo, setElementInfo] = useState<Info>()


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
    if (reservatoriesInformation) {
      const elementHeightHook = useDiscoverHeight(reservatoriesInformation);
      setElementInfo(elementHeightHook)
    }
  }, [reservatoriesInformation])

  return (
    <Main>
     <Header>
        <Titulo>Barragem do Descoberto</Titulo>
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
        
        <Water elementheight={elementInfo?.elementHeight}>
          <div>
            <Image src="/arrow.png" alt="" width={25} height={25}  />
            <h3>{elementInfo?.originalValue}</h3>
          </div>
        </Water>

        <Date>
            <p>
          {reservatoriesInformation?.data.slice(-1)[0].descoberto.data}
            </p>
        </Date>

      </Container>
    </Main>
  );
}
