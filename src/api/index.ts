const BASE_URL = 'http://localhost:8080/api';

export const apiGet = async (endpoint: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
