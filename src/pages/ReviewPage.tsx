import styled from "@emotion/styled";
import { Container } from "@/components/common/Container"
import Title from "@/components/common/Title"
import { H4 } from "@/components/common/H4";
import ReturnIcon from "@assets/return.svg";
import { Code } from "@/components/review/Code";
import ReviewToggle from "@/components/review/ReveiwToggle";
import { reviewList } from "@/const";
import { useState } from "react";


const ReviewPage = () => {
    const [openStates, setOpenStates] = useState<boolean[]>(Array(reviewList.length).fill(false));

    const toggleOpen = (index: number) => {
        setOpenStates(prevStates =>
            prevStates.map((state, idx) => (idx === index ? !state : state))
        );
    };

    return <Container>
        <div>
            <Title />
            <Result>
                <BranchInfo>
                    <H4>target branch</H4>
                    <Code>main</Code>
                </BranchInfo>
                {reviewList.map((review, idx) =>
                    <ReviewToggle
                        key={review.value}
                        commitId={review.value}
                        commitMessage={review.label}
                        isOpen={openStates[idx]}
                        setIsOpen={() => toggleOpen(idx)}
                        review={{ improvementPoints: review.improvementPoints, suggestions: review.suggestions }}
                    />
                )}
            </Result>
        </div>
        <div>
            <ReviewOtherCode href="/">
                <img src={ReturnIcon} />
                <span>Review Other Code</span>
            </ReviewOtherCode>
        </div>
    </Container >
}

export default ReviewPage;

const Result = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 550px;
    overflow-y: auto;
`

const BranchInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    
    pre {
        width: fit-content;
    }
`
const ReviewOtherCode = styled.a`
    display: flex;
    align-items: center;
    gap:8px;

    img {
        height: 18px;
        width: 18px;
    }

    span {
        color: #4A7DFF;
        text-decoration: underline;
        text-decoration-color: #4A7DFF;
        font-size: 20px;
    }
`