import { ReviewResult } from "@/api/review";
import { atom } from "recoil";

export const reviewState = atom<ReviewResult[]>({
    key: "reviewState",
    default: []
})