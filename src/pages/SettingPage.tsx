import styled from "@emotion/styled";
import Title from "@/components/common/Title";
import { Block } from "@/components/common/Block";
import { H4 } from "@/components/common/H4";
import { commitList, targetList } from "@/const";
import { useState } from "react";
import Button from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
    const navigate = useNavigate();
    const [selectedTarget, setSelectedTarget] = useState<string>("1");

    return <Container>
        <div>
            <Title />
            <Block>
                <H4>Branch to Review</H4>
                <select>
                </select>
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
                    {commitList.map(commit => <label key={commit.value}>
                        <input type="checkbox" value={commit.value} />
                        <span>{commit.value}</span>
                        <span>{commit.label}</span>
                    </label>)}
                </CommitList>
            </Block>
            }
        </div>
        <div>
            <Button onClick={() => navigate("/review")}>Analyze Code</Button>
        </div>
    </Container>
}


export default SettingPage;


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
