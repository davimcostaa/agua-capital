"use client"
import { array, bigNumbers } from '@/data/arrays.js';
import { Dados, Info } from "@/interfaces/interface";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import useDiscoverHeight from "../../hooks/useDiscoverHeight";
import { Container, Header, Main, Marker, OptionPersonalized, PersonalizedSelect, Ruler, Titulo, Water, Date } from "../../styles/styles";
import { useRouter } from 'next/navigation';

export default function Home() {

  const [reservatoriesInformation, setReservatoriesInformation] = useState<Dados>();
  const [elementInfo, setElementInfo] = useState<Info>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('/api/statistics/');
        const data = await response.json();
        setReservatoriesInformation(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (reservatoriesInformation) {
      const elementHeightHook = useDiscoverHeight(reservatoriesInformation, 'descoberto');
      setElementInfo(elementHeightHook)
    }
  }, [reservatoriesInformation])


  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    router.push(selectedValue); 
  };

  return (
    <Main>
     <Header>
        <Titulo>Barragem do Descoberto</Titulo>
        <PersonalizedSelect onChange={handleChange}>
          <OptionPersonalized value='/descoberto'>
            Descoberto
          </OptionPersonalized>
          <OptionPersonalized value='/'>
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
            <h3>{elementInfo?.originalValue}%</h3>
          </div>
        </Water>

        <Date>
              Atualizado em: 
              <span>{reservatoriesInformation?.data.slice(-1)[0].descoberto.data}</span>
        </Date>

      </Container>
    </Main>
  );
}
