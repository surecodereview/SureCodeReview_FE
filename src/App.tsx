import Button from "./components/Button"
import { Block } from "./components/Block"
import { H4 } from "./components/H4"
import { Layout } from "./components/Layout"
import Title from "./components/Title"
import styled from "@emotion/styled"
import { useState } from "react"

const targetList = [{ value: '1', label: 'Recent Commit' }, { value: '2', label: 'Specific Commit' }, { value: '3', label: 'All Changes in the Branch' }]
const commitList = [{ value: 'b79915d', label: '“commit message3message3message3message3message3message3message3message3message3”' }, { value: '38226fe', label: '“commit message2”' }, { value: 'dfae0cf', label: '“commit message1”' }]

function App() {
  const [selectedTarget, setSelectedTarget] = useState<string>("1");

  return (
    <Layout>
      <Container>
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
              <Target>
                <label>
                  <input type="radio" value={target.value} checked={target.value === selectedTarget} onChange={() => setSelectedTarget(target.value)} />
                  {target.label}</label>
              </Target>
            )}
          </TargetList>
        </Block>
        {selectedTarget === "2" && < Block >
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
        <Button>Analyze Code</Button>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
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


export default App
