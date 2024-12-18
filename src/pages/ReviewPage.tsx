import styled from "@emotion/styled";
import { Container } from "@/components/common/Container"
import Title from "@/components/common/Title"
import { H4 } from "@/components/common/H4";
import ReturnIcon from "@assets/return.svg";
import { Code } from "@/components/review/Code";
import ReviewToggle from "@/components/review/ReviewToggle";
import { reviewList } from "@/const";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { reviewState } from "@/recoil/atoms/reviewState";


const ReviewPage = () => {
    const [openStates, setOpenStates] = useState<boolean[]>(Array(reviewList.length).fill(false));
    const reviews = useRecoilValue(reviewState);

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
                    <code>main</code>
                </BranchInfo>
                {reviews.map((review, idx) =>
                    <ReviewToggle
                        key={review.id}
                        commitId={review.id}
                        commitMessage={idx + ""}
                        isOpen={openStates[idx]}
                        setIsOpen={() => toggleOpen(idx)}
                        review={review.review}
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