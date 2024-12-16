import styled from "@emotion/styled";

interface BlockProps {
    children: React.ReactNode;
}

export const Block = ({ children }: BlockProps) => {
    return <BrockWrapper>
        {children}
    </BrockWrapper>
}

const BrockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flew-wrap: nowrap;
    gap: 12px;
`