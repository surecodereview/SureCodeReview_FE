import styled from "@emotion/styled";
import Title from "@/components/common/Title";
import { Block } from "@/components/common/Block";
import { H4 } from "@/components/common/H4";
import { targetList } from "@/const";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "@/components/common/Input";
import useDebounce from "@/hooks/useDebounce";
import { fetchBranches, fetchChanges, fetchCommits, fetchRemoteBranches, fetchRemoteChanges, fetchRemoteCommits } from "@/api/git";
import Dropdown from "@/components/common/Dropdown";
import useLoading from "@/hooks/useLoading";
import Loading from "@/components/common/Loading";
import { Change, fetchReviews, ReviewResult } from "@/api/review";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { reviewState } from "@/recoil/atoms/reviewState";
import { branchState } from "@/recoil/atoms/branchState";
import { commitState, RemoteCommit } from "@/recoil/atoms/commitState";
import Checkbox from "@/components/common/Checkbox";
import { targetState } from "@/recoil/atoms/targetState";
import { repositoryState } from "@/recoil/atoms/repositoryState";

const SettingPage = () => {
  const navigate = useNavigate();
  const target = useRecoilValue(targetState);
  const [selectedTarget, setSelectedTarget] = useState<string>("1");
  const [repo, setRepo] = useRecoilState(repositoryState);
  const [owner, setOwner] = useState<string>("");
  const debouncedPath = useDebounce(repo, 500);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useRecoilState(branchState);
  const [commits, setCommits] = useRecoilState(commitState);
  const [selectedCommits, setSelectedCommits] = useState<Record<string, boolean>>({});
  const { loading, startLoading, stopLoading } = useLoading();
  const setReview = useSetRecoilState(reviewState);

  useEffect(() => {
    if (debouncedPath) {
      const getBranches = async () => {
        try {
          const branchesData = await fetchBranches(debouncedPath);
          setBranches(branchesData.branches);
        } catch (error) {
          setBranches([]);
          console.error("Error fetching branches:", error);
        }
      };

      getBranches();
    } else {
      setBranches([]);
    }
  }, [debouncedPath]);

  useEffect(() => {
    if (owner && repo) {
      const getBranches = async () => {
        try {
          const branchesData = await fetchRemoteBranches(owner, repo);
          setBranches(branchesData);
        } catch (error) {
          setBranches([]);
          console.error("Error fetching branches:", error);
        }
      };

      getBranches();
    } else {
      setBranches([]);
    }
  }, [owner, repo])

  useEffect(() => {
    if (target === "local" && selectedTarget === "2" && debouncedPath && selectedBranch) {
      startLoading();
      const getCommits = async () => {
        try {
          const commitsData = await fetchCommits(debouncedPath, selectedBranch);
          const formattedCommits = commitsData.commits.map((commit: string) => {
            const [commitId, ...messageParts] = commit.split(' - ');
            const commitMessage = messageParts.join(' - ').trim().replace(/^[^,]+,\s*/, '');

            return {
              commitId: commitId.trim(),
              commitMessage: commitMessage.trim()
            };
          });
          setCommits(formattedCommits);
        } catch (error) {
          console.error("Error fetching branches:", error);
        } finally {
          stopLoading();
        }
      };

      getCommits();
    } else if (target === "remote" && selectedTarget === "2" && owner && repo && selectedBranch) {
      startLoading();
      const getCommits = async () => {
        try {
          const commitsData = await fetchRemoteCommits(owner, repo, selectedBranch);
          console.log(commitsData)
          const formattedCommits = commitsData.map((commit: RemoteCommit) => {
            return {
              commitId: commit.sha.slice(0, 7).trim(),
              commitMessage: commit.message.trim()
            };
          });
          setCommits(formattedCommits);
        } catch (error) {
          console.error("Error fetching branches:", error);
        } finally {
          stopLoading();
        }
      };

      getCommits();
    }
  }, [selectedTarget, selectedBranch])


  const handleCommitToggle = (commitId: string) => {
    setSelectedCommits(prevState => ({
      ...prevState,
      [commitId]: !prevState[commitId]
    }));
  };

  const handleClickAnalyzeButton = async () => {
    startLoading();
    try {
      const commitIds = Object.keys(selectedCommits);
      let changes: Change[];
      if (target === "local") {
        changes = await fetchChanges(repo, commitIds);
      } else {
        changes = await fetchRemoteChanges(owner, repo, commitIds);
      }

      console.log(changes)

      // llama 모델 호출 및 응답값 state에 저장
      if (changes) {
        const reviews: ReviewResult[] = await fetchReviews(changes);
        setReview(reviews);
        navigate("/review");
      }
    } catch (e) {
      console.error('Error in handleClickAnalyzeButton:', e);
    } finally {
      stopLoading();
    }
  };

  if (!target) {
    return <Navigate to="/" replace />;
  }

  return <>
    {loading && <Loading />}
    <Container>
      <Title />
      <Content>
        {target === "local" &&
          <Block>
            <H4>Local Repository Path</H4>
            <Input
              value={repo}
              setValue={setRepo}
              placeholder="Please enter the local repository path" />
          </Block>
        }
        {target === "remote" &&
          <div style={{ display: "flex", gap: "36px" }}>
            <Block>
              <H4>Repository Owner</H4>
              <Input
                value={owner}
                setValue={setOwner}
                placeholder="Please enter the remote repository owner" />
            </Block>
            <Block>
              <H4>Repository Name</H4>
              <Input
                value={repo}
                setValue={setRepo}
                placeholder="Please enter the remote repository name" />
            </Block>
          </div>
        }
        <Block>
          <H4>Branch to Review</H4>
          <Dropdown
            optionList={branches}
            selectedValue={selectedBranch}
            onChange={setSelectedBranch}
            placeholder="Select a branch" />
        </Block>
        <Block>
          <H4>Review Target</H4>
          <TargetList>
            {targetList.map(target =>
              <Target key={target.value} onClick={() => setSelectedTarget(target.value)}>
                <input type="radio" value={target.value} checked={target.value === selectedTarget} />
                <label>{target.label}</label>
              </Target>
            )}
          </TargetList>
        </Block>
        {selectedTarget === "2" && <Block>
          <H4>Commit List</H4>
          <CommitList>
            {
              commits.length === 0 && branches.length === 0 &&
              <EmptyMessage>브랜치를 선택해 주세요.</EmptyMessage>
            }
            {commits.map(commit =>
              <label key={commit.commitId}>
                <Checkbox
                  value={commit.commitId}
                  checked={!!selectedCommits[commit.commitId]}
                  onChange={() => handleCommitToggle(commit.commitId)} />
                <span>{commit.commitId}</span>
                <span>{commit.commitMessage}</span>
              </label>)}
          </CommitList>
        </Block>
        }
      </Content>
      <div>
        <Button
          onClick={handleClickAnalyzeButton}
          disabled={
            (target === "local" && (
              repo === "" &&
              selectedBranch === ""
            )) || (target === "remote" && (
              owner === "" || repo === "" || selectedBranch === ""
            )) ||
            selectedTarget === "2" && !Object.values(selectedCommits).some(Boolean)
          }>
          Analyze Code
        </Button>
      </div>
    </Container>
  </>
}


export default SettingPage;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
  scrollbar-width: none;
`

const Target = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  font-family: 'Courier', sans-serif;
  font-size: 1rem;

  label, input {
    cursor: pointer;
  }

  input[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #D9D9D9;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #D9D9D9;

    &:checked {
      position: relative;

      &::after {
        content: '';
        width: 12px;
        height: 12px;
        background-color: #243469;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`

const TargetList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 36px;
`

const CommitList = styled.div`
  border-radius: 8px;
  border: 1px solid #929292;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: 56px;
  max-height: 132px;
  padding: 12px 16px;
  gap: 4px;

  label {
    display: flex;
    align-items: center;
    width: 100%;
    font-family: 'Courier', sans-serif;
    cursor: pointer;

    span {
      &:nth-of-type(1) {
        display: inline-block;
        min-width: 80px;
        font-weight: 600;
      }

      &:nth-of-type(2) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }
    }
  }
`

const EmptyMessage = styled.span`
  font-size: 14px;
  color:rgb(103, 103, 103);
`