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
    [key: string]: any; 
}
  
export interface Dados {
    data: IReservatorio[];
    watershed: string;
}

export interface Info {  
    elementHeight: number;
    originalValue: string;    
}