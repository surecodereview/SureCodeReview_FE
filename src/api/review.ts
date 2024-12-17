import { apiPost } from '@api/index';

export interface Change {
    id: string;
    changes: string;
}

export interface ReviewResult {
    id: string;
    review: string;
}

export const fetchReviews = async (changes: Change[]): Promise<ReviewResult[]> => {
    const response = await apiPost('/review', changes);
    return response.reviews;
};
