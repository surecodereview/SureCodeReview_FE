import styled from "@emotion/styled"

interface InputProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
}

const Input = ({ value, setValue, placeholder }: InputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return <InputWrapper value={value} onChange={handleChange} placeholder={placeholder} />
}

export default Input;

const InputWrapper = styled.input`
    appearance: none;
    -webkit-appearance: none; 
    -moz-appearance: none; 
    border: none;
    outline: none;
    font-size: 16px;
    background-color: #F0F0F0;
    border-radius: 8px;
    max-height: 48px;
    width: 100%;
    padding: 8px 12px;
    font-family: 'Courier', monospace;

    &::placeholder {
        color: #595959;
        font-size: 20px;
        font-family: 'Courier', monospace;
        font-size: 16px;
    }
`