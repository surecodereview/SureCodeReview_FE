import styled from "@emotion/styled";
import Title from "@/components/common/Title";
import { Block } from "@/components/common/Block";
import { H4 } from "@/components/common/H4";
import { targetList } from "@/const";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { useNavigate } from "react-router-dom";
import Input from "@/components/common/Input";
import useDebounce from "@/hooks/useDebounce";
import { fetchBranches, fetchChanges, fetchCommits } from "@/api/git";
import Dropdown from "@/components/common/Dropdown";
import useLoading from "@/hooks/useLoading";
import Loading from "@/components/common/Loading";

interface Commit {
  commitId: string;
  commitMessage: string;
}

interface Change {
  id: string;
  changes: string;
}

const SettingPage = () => {
  const navigate = useNavigate();
  const [selectedTarget, setSelectedTarget] = useState<string>("1");
  const [repositoryPath, setRepositoryPath] = useState<string>("");
  const debouncedPath = useDebounce(repositoryPath, 500);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [commits, setCommits] = useState<Commit[]>([]);
  const [selectedCommits, setSelectedCommits] = useState<Record<string, boolean>>({});
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (debouncedPath) {
      const getBranches = async () => {
        try {
          const branchesData = await fetchBranches(debouncedPath);
          setBranches(branchesData.branches);
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      };

      getBranches();
    }
  }, [debouncedPath]);

  useEffect(() => {
    if (selectedTarget === "2" && debouncedPath && selectedBranch) {
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
      const data: Change = await fetchChanges(repositoryPath, commitIds);
    } catch (e) {
      console.error('Error in handleClickAnalyzeButton:', e);
    } finally {
      stopLoading();
      // navigate("/review");
    }
  };

  return <>
    {loading && <Loading />}
    <Container>
      <div>
        <Title />
        <Content>
          <Block>
            <H4>Local Repository Path</H4>
            <Input
              value={repositoryPath}
              setValue={setRepositoryPath}
              placeholder="Please enter the local repository path" />
          </Block>
          <Block>
            <H4>Branch to Review</H4>
            <Dropdown optionList={branches} selectedValue={selectedBranch} onChange={setSelectedBranch} />
          </Block>
          <Block>
            <H4>Review Target</H4>
            <TargetList>
              {targetList.map(target =>
                <Target key={target.value}>
                  <label>
                    <input type="radio" value={target.value} checked={target.value === selectedTarget} onChange={() => setSelectedTarget(target.value)} />
                    {target.label}</label>
                </Target>
              )}
            </TargetList>
          </Block>
          {selectedTarget === "2" && <Block>
            <H4>Commit List</H4>
            <CommitList>
              {commits.map(commit => <label key={commit.commitId}>
                <input
                  type="checkbox"
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
      </div>
      <div>
        <Button
          onClick={handleClickAnalyzeButton}
          disabled={repositoryPath === "" || selectedBranch === ""}>
          Analyze Code
        </Button>
      </div>
    </Container>
  </>
}


export default SettingPage;

const Content = styled.div`
  height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`


const Target = styled.div`
  display: flex;
  gap: 2px;
  cursor: pointer;

  label, input {
    cursor: pointer;
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
  height: 156px;
  padding: 16px;

  label {
    display: flex;
    align-items: center;
    width: 100%;

    span {
      &:nth-of-type(1) {
        display: inline-block;
        min-width: 80px;
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

