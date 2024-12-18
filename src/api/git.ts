import { apiGet } from '@api/index';

/* 로컬 저장소 */
/** 모든 브랜치 목록 가져오기 */
export const fetchBranches = async (repositoryPath: string) => {
    return await apiGet(`/branches?path=${encodeURIComponent(repositoryPath)}`);
};

/** 특정 브랜치의 커밋 리스트 가져오기 */
export const fetchCommits = async (repositoryPath: string, branch: string) => {
    return await apiGet(`/commits/${branch}?path=${encodeURIComponent(repositoryPath)}`);
};

/** 특정 커밋의 변경 사항 가져오기 */
export const fetchChanges = async (repositoryPath: string, commitIds: string[]) => {
    return await apiGet(`/changes?commitIds=${commitIds.join(',')}&path=${encodeURIComponent(repositoryPath)}`);
};


/* 원격 저장소 */
/** 모든 브랜치 목록 가져오기 */
export const fetchRemoteBranches = async (owner: string, repo: string) => {
    return await apiGet(`/remote/branches?owner=${owner}&repo=${repo}`);
};

/** 특정 브랜치의 커밋 리스트 가져오기 */
export const fetchRemoteCommits = async (owner: string, repo: string, branch: string) => {
    return await apiGet(`/remote/commits?owner=${owner}&repo=${repo}&branch=${branch}`);
};

/** 특정 커밋의 변경 사항 가져오기 */
export const fetchRemoteChanges = async (owner: string, repo: string, commitIds: string[]) => {
    return await apiGet(`/remote/changes?commitIds=${commitIds.join(',')}&owner=${owner}&repo=${repo}`);
}