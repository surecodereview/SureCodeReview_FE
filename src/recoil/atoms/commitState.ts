import { atom } from "recoil";

export const commitState = atom<Commit[]>({
    key: "commitState",
    default: []
})

export interface Commit {
    commitId: string;
    commitMessage: string;
}

export interface RemoteCommit {
    author: string;
    date: string;
    message: string;
    sha: string;
};
