"use client"
import { array, bigNumbers } from '@/data/arrays.js';
import useDiscoverHeight from "@/hooks/useDiscoverHeight";
import { Dados, Info } from "@/interfaces/interface";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Container, Date, Header, Main, Marker, OptionPersonalized, PersonalizedSelect, Ruler, Titulo, Water } from "../styles/styles";
import { ChangeEvent } from 'react';
import useWindowDimensions from '@/hooks/useWindowDimension';

export default function Home() {

  const [reservatoriesInformation, setReservatoriesInformation] = useState<Dados>();
  const [elementInfo, setElementInfo] = useState<Info>();
  const { width, height } = useWindowDimensions();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/statistics/', {
                headers: {
                    'Cache-Control': 'no-cache' 
                },
                cache: "no-store",
            });
            const data = await response.json();
            setReservatoriesInformation(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    fetchData();
}, []);

  useEffect(() => {
    if (reservatoriesInformation) {
      const elementHeightHook = useDiscoverHeight(reservatoriesInformation, 'santaMaria');
      setElementInfo(elementHeightHook)
    }
  }, [reservatoriesInformation, width, height])

    
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    router.push(selectedValue); 
  };

  return (
    <Main>
     <Header>
        <Titulo>Barragem de Santa Maria</Titulo>
        <PersonalizedSelect onChange={handleChange}>
        <OptionPersonalized value='/'> 
            Santa Maria
          </OptionPersonalized>
          <OptionPersonalized value='/descoberto'>
              Descoberto
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
            <h3>{elementInfo?.originalValue}%</h3>
          </div>
        </Water>
        <h2>Acompanhe os níveis dos reservatórios do DF</h2>

        <Date>
              Atualizado em: 
              <span>{reservatoriesInformation?.data.slice(-1)[0].santaMaria.data}</span>
        </Date>
      </Container>
    </Main>
  );
}
