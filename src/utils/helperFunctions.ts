import { User } from "../features/usersDataSlice";

//Function to convert date to timestamp
export const dateToTimestamp = (date: Date): number =>
  Math.floor(date.getTime() / 1000);

//Function to convert timestamp to date
export const timestampToDate = (timestamp: number): Date =>
  new Date(timestamp * 1000);

//Function to check if date was in the past
export const isPastDate = (date: Date): boolean => {
  const now = new Date();
  return date < now;
};

//Function which generates random id
export const generateRandomId = (): number => {
  const min = 10000000;
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Function that check that input is at least 11 characters long
export const isAtLeastElevenCharacters = (personalId: string): boolean =>
  personalId.length >= 11;

//Function which checks if any of other users in database have this id number
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

//Function which turns timestamp in string format into Date
export const timestampStringtoDate = (timestampString: string): string => {
  return timestampToDate(Number(timestampString)).toLocaleDateString("en-US");
};
