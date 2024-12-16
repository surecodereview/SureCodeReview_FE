const BASE_URL = 'http://localhost:8080/api'; // 프록시를 통해 접근할 기본 URL

// GET 요청을 위한 기본 함수
export const apiGet = async (endpoint: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
