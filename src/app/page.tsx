"use client"
import styles from "./page.module.css";

export default function Home() {

  const array = [100, 97, 95, 93, 90, 87, 85, 83, 80, 77, 75, 73, 70, 67, 65, 63, 60, 57, 55, 53, 50, 47, 45, 43, 40, 37, 35, 33, 30, 27, 25, 23, 20, 17, 15, 13, 10]


  function discoverHeight(elementId: string) {
    
    const myElement = document.getElementById(`${elementId}`);

    if (myElement) {
      const { bottom } = myElement.getBoundingClientRect();
      const pageHeight = window.innerHeight;
      const elementDistance = pageHeight - bottom;

      console.log('Distância do elemento ao fundo da página:', elementDistance, 'pixels');
    }    
  }

  return (
    <>
      <div className={styles.container}>
        <aside className={styles.ruler}>
        {array.map((number) => {
            let content;
            if (number % 10 === 0) {
              content = number;
            } else {
              content = '-';
            }
            return (
                <>
                {content != '-' ? 
                   <p 
                   id={number.toString()}
                   key={number}
                   onClick={() => discoverHeight(number.toString())}
                 >
                   {content}
                 </p>
                : 
                <span>
                 &mdash;	
                </span>
                }
                </>
            );
          })}
        </aside>
        <div className={styles.water}></div>
      </div>
    </>
  );
}
