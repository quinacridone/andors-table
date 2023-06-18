import { atom } from "jotai";
import { AndorsData } from ".";

export const databaseAtom = atom<AndorsData | undefined>(undefined);
