import { perc } from '../../utils';
import { GSIRanking, AuthUserInfo } from '../../interfaces';

const CALCULATE_SCHOLAR_METRICS_BY_WEIGHT = false;

export const minFirstPublicationYear = (arr: Array<GSIRanking>): number => {
  return Number(arr.reduce((acc, obj) => Math.min(acc, Number(obj.firstPublicationYear)), 0));
};

export const maxFirstPublicationYear = (arr: Array<GSIRanking>): number => {
  return Number(arr.reduce((acc, obj) => Math.max(acc, Number(obj.firstPublicationYear)), 0));
};

export const citationsPerCapita = (citations: number, totalPublications: number) => {
  if (!citations || !totalPublications) return 0;
  if (citations === 0 || totalPublications === 0) return 0;
  return (citations / totalPublications).toFixed(2);
};

export const hindexPerCapita = (hindex: number, firstPublicationYear: number) => {
  if (!hindex || !firstPublicationYear) return 0;
  if (hindex === 0 || firstPublicationYear === 0) return 0;
  const currentYear = new Date().getFullYear();
  const yearDiff = currentYear - firstPublicationYear;
  if (yearDiff <= 0) return 0;
  return (hindex / yearDiff).toFixed(2);
};

export const i10hindexPerCapita = (i10hindex: number, firstPublicationYear: number) => {
  if (!i10hindex || !firstPublicationYear) return 0;
  if (i10hindex === 0 || firstPublicationYear === 0) return 0;
  const currentYear = new Date().getFullYear();
  const yearDiff = currentYear - firstPublicationYear;
  if (yearDiff <= 0) return 0;
  return (i10hindex / yearDiff).toFixed(2);
};


export const citationByWeight = (
  citationsPerCapita: number,
  lecturers: Array<AuthUserInfo>,
  citationWeight: number,
): { perCapita: number; weigth: number } => {
  if (citationsPerCapita === 0 || lecturers.length <= 0 || citationWeight === 0) {
    return { perCapita: 0, weigth: 0 };
  } else {
    const maximumCPC = Math.max(...lecturers.map((o) => o.citationsPerCapita));
    const weightCPC = (citationsPerCapita / maximumCPC) * citationWeight;
    return {
      perCapita: Number(citationsPerCapita),
      weigth: Number(weightCPC),
    };
  }
};

export const hindexByWeight = (
  hindexPerCapita: number,
  lecturers: Array<AuthUserInfo>,
  hindexWeight: number,
): { perCapita: number; weigth: number } => {
  if (hindexPerCapita === 0 || lecturers.length <= 0 || hindexWeight === 0) {
    return { perCapita: 0, weigth: 0 };
  } else {
    const maximumHPC = Math.max(...lecturers.map((o) => o.hindexPerCapita));
    const weightHPC = (hindexPerCapita / maximumHPC) * hindexWeight;
    return {
      perCapita: Number(hindexPerCapita),
      weigth: Number(weightHPC),
    };
  }
};

export const i10indexByWeight = (
  i10hindexPerCapita: number,
  lecturers: Array<AuthUserInfo>,
  i10indexWeight: number,
): { perCapita: number; weigth: number } => {
  if (i10hindexPerCapita === 0 || lecturers.length <= 0 || i10indexWeight === 0) {
    return {
      perCapita: 0,
      weigth: 0,
    };
  } else {
    const maximumI10PC = Math.max(...lecturers.map((o) => o.i10hindexPerCapita));
    const weightI10PC = (i10hindexPerCapita / maximumI10PC) * i10indexWeight;
    return {
      perCapita: Number(i10hindexPerCapita),
      weigth: Number(weightI10PC),
    };
  }
};

export const totalByWeight = (
  citationsPerCapita: number,
  hindexPerCapita: number,
  i10hindexPerCapita: number,
): number => {
  return Number((citationsPerCapita + hindexPerCapita + i10hindexPerCapita).toFixed(0));
};
  

export const addCitations = (arr: Array<GSIRanking>): number => {
  return arr?.reduce((acc, obj) => Number(acc) + Number(obj.citations), 0);
};
export const addHindex = (arr: Array<GSIRanking>): number => {
  return arr?.reduce((acc, obj) => Number(acc) + Number(obj.hindex), 0);
};
export const addI10index = (arr: Array<GSIRanking>): number => {
  return arr?.reduce((acc, obj) => Number(acc) + Number(obj.i10hindex), 0);
};
export const addGooglePresence = (arr: Array<GSIRanking>): number => {
  const total = arr?.reduce((acc, obj) => Number(acc) + Number(obj.googlePresence), 0);
  const percT = perc(total, arr?.length);
  return Number(percT);
};
export const addTotal = (arr: Array<GSIRanking>): number => {
  const cit = arr?.reduce((acc, obj) => Number(acc) + Number(obj.citations), 0);
  const hin = arr?.reduce((acc, obj) => Number(acc) + Number(obj.hindex), 0);
  const i10 = arr?.reduce((acc, obj) => Number(acc) + Number(obj.i10hindex), 0);
  const total = ((cit + hin + i10) / 3).toFixed(0);
  return Number(total);
};

export const addTotalPublications = (arr: Array<GSIRanking>): number => {
  return arr?.reduce((acc, obj) => Number(acc) + Number(obj.totalPublications), 0);
};

export const totalRanking = (citation: number, hindex: number, i10index: number): number => {
  if (citation === 0 || hindex === 0 || i10index === 0) {
    return 0.0;
  } else {
    const total = (citation + hindex + i10index) / 3;
    return Number(total.toFixed(0));
  }
};

export const getPosition = (index: number) => {
  switch (index % 100) {
    case 11:
    case 12:
    case 13:
      return index + 'th';
    default:
      switch (index % 10) {
        case 1:
          return index + 'st';
        case 2:
          return index + 'nd';
        case 3:
          return index + 'rd';
        default:
          return index + 'th';
      }
  }
};
