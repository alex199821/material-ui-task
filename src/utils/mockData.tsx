import { dateToTimestamp } from "./dateFormatter";
export enum Gender {
  Male = "Male",
  Female = "Female",
}

export interface User {
  id?: number;
  personalId: string;
  name: string;
  surname: string;
  gender: Gender | string;
  birthDate: any;
  birthPlace: string;
  phoneNumber: number | string;
  address: string;
}

console.log(dateToTimestamp(new Date(1998, 8, 23)));

export const users: User[] = [
  {
    id: 1,
    personalId: "01008034571",
    name: "John",
    surname: "Doe",
    gender: Gender.Male,
    birthDate: 320097600,
    birthPlace: "Tbilisi, Georgia",
    phoneNumber: 593235432,
    address: "Rustaveli 23, Tbilisi, Georgia",
  },
  {
    id: 2,
    personalId: "11406234531",
    name: "Amy",
    surname: "Smith",
    gender: Gender.Female,
    birthDate: new Date(1998, 8, 23),
    birthPlace: "Batumi, Georgia",
    phoneNumber: 571983423,
    address: "Nutsubidze 43, Tbilisi, Georgia",
  },
  {
    id: 3,
    personalId: "01021011549",
    name: "Bobby",
    surname: "Brown",
    gender: Gender.Male,
    birthDate: new Date(1971, 11, 30),
    birthPlace: "Tbilisi, Georgia",
    phoneNumber: 551349034,
    address: "Dolidze st 34, Tbilisi, Georgia",
  },
  {
    id: 4,
    personalId: "34205344654",
    name: "Andy",
    surname: "Miller",
    gender: Gender.Male,
    birthDate: new Date(2001, 3, 2),
    birthPlace: "Tbilisi, Georgia",
    phoneNumber: 599093422,
    address: "Vaja Pshavela 32, Batumi, Georgia",
  },
  {
    id: 345,
    personalId: "20534011549",
    name: "Nina",
    surname: "Williams",
    gender: Gender.Female,
    birthDate: new Date(1992, 7, 6),
    birthPlace: "Tbilisi, Georgia",
    phoneNumber: 555832391,
    address: "Kostava 63, Tbilisi, Georgia",
  },
];
