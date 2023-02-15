import { User } from "./mockData";

export const dateToTimestamp = (date: Date): number =>
  Math.floor(date.getTime() / 1000);

export const timestampToDate = (timestamp: number): Date =>
  new Date(timestamp * 1000);

export const isPastDate = (date: Date): boolean => {
  const now = new Date();
  return date < now;
};

export const generateRandomId = (): number => {
  const min = 10000000;
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isAtLeastElevenCharacters = (personalId: string): boolean =>
  personalId.length >= 11;

export const checkOriginalIdNumber = (
  users: User[],
  personalId: string,
  editingRowId: number | null
): boolean => {
  let original = true;
  //If statement executed in case of new row is being created
  if (!editingRowId && users.find((user) => user.personalId === personalId)) {
    original = false;
    //If statement executed in case of editing of already exisiting row
  } else if (
    editingRowId &&
    users.find((user) => user.id === editingRowId)?.personalId !== personalId &&
    users.find((user) => user.personalId === personalId)
  ) {
    original = false;
  }
  return original;
};

export const findUserById = (usersAr: User[], id: number): User | undefined => {
  return usersAr.find((usersAr) => usersAr.id === id);
};
