export interface IHoroscope {
  date: string;
  horoscope: string;
  sign: string;
  signDisplay: string;
}

export interface IHoroscopeApiResponse {
  data: {
    date: string;
    horoscope_data: string;
  };
  status: number;
  success: boolean;
}

