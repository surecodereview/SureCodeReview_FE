import styled from "@emotion/styled";
import CopyIcon from "@assets/copy.svg";
import CheckIcon from "@assets/check.svg";
import { useState } from "react";

interface CodeProps {
    children: React.ReactNode;
    color?: string;
    copy?: boolean;
}

export const Code = ({ children, color, copy }: CodeProps) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleCopyButtonClick = () => {
        if (typeof children === 'string') {
            navigator.clipboard.writeText(children)
                .then(() => {
                    setIsCopied(true);
                })
        }
    }

    return <CodeWrapper $fColor={color}>
        <code>{children}</code>
        {copy && <button onClick={handleCopyButtonClick}>
            {!isCopied && <img src={CopyIcon} />}
            {isCopied && <img src={CheckIcon} />}
        </button>}
    </CodeWrapper>
}

const CodeWrapper = styled.pre<{ $fColor?: string }>`
    border-radius: 8px;
    width: 100%;
    padding: 5px;
    position: relative;
    padding: 0;
    
    code {
        font-weight: 600;
        color: ${props => props.$fColor ?? '#000000'};
        background-color: #303030;
    }

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