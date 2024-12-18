import { atom } from "recoil";

export const branchState = atom<string>({
    key: "branchState",
    default: ""
})