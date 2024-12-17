import { atom } from "recoil";

export interface Review {
    improvementPoints: string;
    suggestions: string;
}

export const reviewState = atom<Review>({
    key: "reviewState",
    default: {
        improvementPoints: "",
        suggestions: ""
    },
})