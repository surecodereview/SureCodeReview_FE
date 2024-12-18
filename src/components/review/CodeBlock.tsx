import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CopyIcon from "@assets/copy.svg";
import CheckIcon from "@assets/check.svg";
import styled from '@emotion/styled';
import { useState } from 'react';

interface CodeBlockProps {
    code: string;
}

const CodeBlock = ({ code }: CodeBlockProps) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setIsCopied(true);
            })
    };

    return (
        <CodeBlockWrapper>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {code}
            </ReactMarkdown>
            <button onClick={handleCopy}>
                {!isCopied && <img src={CopyIcon} />}
                {isCopied && <img src={CheckIcon} />}
            </button>
        </CodeBlockWrapper>
    );
};

const CodeBlockWrapper = styled.div`
    position: relative;

    button {
        position: absolute;
        bottom: 8px;
        right: 8px;
        border-radius: 50%;
        padding: 8px;

        img {
            width: 16px;
            height: 16px;
        }

        &:hover {
            background-color:rgba(203, 203, 203, 0.5);
        }
    }
`

export default CodeBlock;
