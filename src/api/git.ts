import { apiGet } from './index';

// 모든 브랜치 목록 가져오기
export const fetchBranches = async (repositoryPath: string) => {
    return await apiGet(`/branches?path=${encodeURIComponent(repositoryPath)}`);
};

// 특정 브랜치의 커밋 리스트 가져오기
export const fetchCommits = async (repositoryPath: string, branch: string) => {
    return await apiGet(`/commits/${branch}?path=${encodeURIComponent(repositoryPath)}`);
};

// 특정 커밋의 변경 사항 가져오기
export const fetchChanges = async (repositoryPath: string, commitIds: string[]) => {
    const response = await fetch(`/changes?commitIds=${commitIds.join(',')}&path=${encodeURIComponent(repositoryPath)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Network response was not ok');

    return response.json();
};
