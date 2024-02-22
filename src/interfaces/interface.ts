export interface IReservatorio {
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
  
export interface Dados {
    data: IReservatorio[];
}

export interface Info {  
    elementHeight: number;
    originalValue: string;    
}