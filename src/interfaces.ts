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
  birthDate: Date | number | undefined;
  birthPlace: string;
  phoneNumber: number | string;
  address: string;
}
