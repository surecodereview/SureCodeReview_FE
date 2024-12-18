import { atom } from "recoil";

interface Commit {
    commitId: string;
    commitMessage: string;
}

export const commitState = atom<Commit[]>({
    key: "commitState",
    default: []
})