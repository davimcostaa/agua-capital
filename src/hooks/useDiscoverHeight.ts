import { Dados } from "@/interfaces/interface";

function useDiscoverHeight(reservatoriesInformation: Dados, watershed: string) {
  let elementHeight = 0
  let originalValue = ''

    if (reservatoriesInformation && reservatoriesInformation.data.length > 0) {
      const watershedName = watershed;
      const lastRegister = reservatoriesInformation.data.slice(-1)[0];
      originalValue = lastRegister[watershed]?.volumePorc ?? '';

      if (originalValue !== undefined) {
        let parsedValue = parseInt(originalValue);
        let ultimoDigito = parsedValue.toString().charAt(parsedValue.toString().length - 1);

        if (ultimoDigito === '1' || ultimoDigito === '9') {
          parsedValue = parsedValue - 1;
        }

        const myElement = document.getElementById(`${parsedValue}`);

        if (myElement) {
          const { top } = myElement.getBoundingClientRect();
          const pageHeight = document.documentElement.scrollHeight;
          const elementDistance = pageHeight - top;
          if (elementDistance) {
            elementHeight = elementDistance;
          }
        }
      }
    }

  return {
    elementHeight,
    originalValue
  }
}

export default useDiscoverHeight;
