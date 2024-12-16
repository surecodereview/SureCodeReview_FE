import styled from "@emotion/styled"

interface ButtonProps {
    children?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
    return <ButtonWrapper onClick={onClick} disabled={disabled}>
        {children}
    </ButtonWrapper>
}

export default Button;

const ButtonWrapper = styled.button`
    width: 100%;
    height: 48px;
    border-radius: 8px;
    background-color: #243469;
    color: #ffffff;
    font-size: 20px;
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    cursor: pointer;


    ${props => props.disabled && `
        background-color: #F0F0F0;
        color: #595959;
        cursor: not-allowed;
    `}
`