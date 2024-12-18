import { atom } from "recoil";

export type Target = "local" | "remote" | null;

export const targetState = atom<Target>({
    key: "targetState",
    default: null
})