import { model, models, Schema } from 'mongoose';

export interface IStatistics {
    "descoberto": {
      cota: string;
      volumeHm: string;
      volumePorc: string;
      data: string;
    };
    "santaMaria": {
      cota: string;
      volumeHm: string;
      volumePorc: string;
      data: string;
    };
  }

const StatisticsSchema = new Schema<IStatistics>(
    {  
      descoberto: {
        cota: { type: String, required: true },
        volumeHm: { type: String, required: true },
        volumePorc: { type: String, required: true },
        data: { type: String, required: true }
      },
      santaMaria: {
        cota: { type: String, required: true },
        volumeHm: { type: String, required: true },
        volumePorc: { type: String, required: true },
        data: { type: String, required: true }
      }
    }
);
const Statistics = model('Statistics', StatisticsSchema);
export default Statistics