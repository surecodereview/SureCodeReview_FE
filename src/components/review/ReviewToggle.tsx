import styled from "@emotion/styled";
import { H4 } from "@/components/common/H4";
import ArrowDownIcon from "@assets/arrowDown.svg";
import ArrowUpIcon from "@assets/arrowUp.svg";
import ReactMarkdown from 'react-markdown';

interface ReviewToggleProps {
    commitId: string;
    commitMessage: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<number>>;
    review: string;
}

const ReviewToggle = ({ commitId, commitMessage, isOpen, setIsOpen, review }: ReviewToggleProps) => {
    return (
        <ToggleWrapper>
            <ToggleTitle onClick={() => setIsOpen(-1)}>
                <ReviewInfo>
                    <span>{commitId}</span>
                    <span>{commitMessage}</span>
                </ReviewInfo>
                {isOpen ? <img src={ArrowUpIcon} alt="Collapse" /> : <img src={ArrowDownIcon} alt="Expand" />}
            </ToggleTitle>
            {isOpen && (
                <ToggleContent>
                    <H4>분석 내용</H4>
                    <ReactMarkdown>{review}</ReactMarkdown>
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
    padding: 4px 12px;
    flex-grow: 1;
    width: 90%;
    font-family: 'Courier';

    span:nth-of-type(1) {
        font-weight: 600;
        color: #E24848;
    }

    span:nth-of-type(2) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
    }
`;

const ToggleContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    padding: 0 12px 12px 12px;
    font-family: 'Pretendard';
`;

export default ReviewToggle;
