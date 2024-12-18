import { atom } from "recoil";

export const repositoryState = atom<string>({
    key: "repositoryState",
    default: ""
})