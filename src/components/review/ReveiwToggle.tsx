import styled from "@emotion/styled";
import { H4 } from "@/components/common/H4";
import ArrowDownIcon from "@assets/arrowDown.svg";
import ArrowUpIcon from "@assets/arrowUp.svg";

interface Review {
    improvementPoints: string;
    suggestions: string;
}

interface ReviewToggleProps {
    commitId: string;
    commitMessage: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<number>>;
    review: Review;
}

const ReviewToggle = ({ commitId, commitMessage, isOpen, setIsOpen, review }: ReviewToggleProps) => {
    return (
        <ToggleWrapper onClick={() => setIsOpen(-1)}>
            <ToggleTitle>
                <ReviewInfo>
                    <span>{commitId}</span>
                    <span>{commitMessage}</span>
                </ReviewInfo>
                {isOpen ? <img src={ArrowUpIcon} alt="Collapse" /> : <img src={ArrowDownIcon} alt="Expand" />}
            </ToggleTitle>
            {isOpen && (
                <ToggleContent>
                    <H4>개선할 점</H4>
                    <span>{review.improvementPoints}</span>
                </ToggleContent>
            )}
        </ToggleWrapper>
    );
}

const ToggleWrapper = styled.div`
    border-radius: 8px;
    border: 1px solid #A8A8A8;
    padding: 8px;
`;

const ToggleTitle = styled.div`
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    img {
        height: 16px;
        width: 16px;
    }
`;

const ReviewInfo = styled.div`
    display: flex;
    gap: 28px;
    flex-grow: 1;
    width: 90%;

    span:nth-of-type(2) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const ToggleContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export default ReviewToggle;
