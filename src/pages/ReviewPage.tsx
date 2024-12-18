import styled from "@emotion/styled";
import { Container } from "@/components/common/Container"
import Title from "@/components/common/Title"
import { H4 } from "@/components/common/H4";
import ReturnIcon from "@assets/return.svg";
import ReviewToggle from "@/components/review/ReviewToggle";
import { reviewList } from "@/const";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { reviewState } from "@/recoil/atoms/reviewState";
import { branchState } from "@/recoil/atoms/branchState";
import { commitState } from "@/recoil/atoms/commitState";
import { Navigate, useNavigate } from "react-router-dom";
import { Code } from "@/components/review/Code";

const ReviewPage = () => {
    const navigate = useNavigate();
    const [openStates, setOpenStates] = useState<boolean[]>(Array(reviewList.length).fill(false));
    const reviews = useRecoilValue(reviewState);
    const [branch, setBranch] = useRecoilState(branchState);
    const commits = useRecoilValue(commitState);

    const toggleOpen = (index: number) => {
        setOpenStates(prevStates =>
            prevStates.map((state, idx) => (idx === index ? !state : state))
        );
    };

    if (reviews.length === 0) {
        return <Navigate to="/" replace />;
    }

    return <Container>
        <Title />
        <Result>
            <BranchInfo>
                <H4>target branch</H4>
                <Code color="#89DAFF">{branch}</Code>
            </BranchInfo>
            {reviews.map((review, idx) =>
                <ReviewToggle
                    key={review.id}
                    commitId={review.id}
                    commitMessage={commits.find(commit => commit.commitId === review.id)?.commitMessage ?? ""}
                    isOpen={openStates[idx]}
                    setIsOpen={() => toggleOpen(idx)}
                    review={review.review}
                />
            )}
        </Result>
        <ReviewOtherCode onClick={() => { setBranch(""); navigate("/"); }}>
            <img src={ReturnIcon} />
            <span>Review Other Code</span>
        </ReviewOtherCode>
    </Container >
}

export default ReviewPage;

const Result = styled.div`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    gap: 8px;
    overflow-y: auto;
    scrollbar-width: none;
    flex: 1;
`

const BranchInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    
    pre {
        width: fit-content;
    }
`
const ReviewOtherCode = styled.button`
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
        font-size: 16px;
    }
`