import { useState } from 'react';
import styled from '@emotion/styled';

interface DropdownProps {
    optionList: string[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const Dropdown = ({ optionList, selectedValue, onChange }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (value: string) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <SelectContainer>
            <Selected onClick={() => setIsOpen(!isOpen)}>
                {selectedValue || 'Select an option'}
                <Arrow isOpen={isOpen} />
            </Selected>
            {isOpen && (
                <OptionListContainer>
                    {optionList.map(option => (
                        <Option key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </Option>
                    ))}
                </OptionListContainer>
            )}
        </SelectContainer>
    );
};

export default Dropdown;

const SelectContainer = styled.div`
    position: relative;
    max-width: 200px;
`;

const Selected = styled.div<{ disabled: boolean }>`
    height: 16px;
    border-radius: 8px;
    border: 1px solid #696969;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Courier', sans-serif;

    ${props => props.disabled && `
        border: 1px solid rgb(220, 220, 220);
        background-color:rgb(220, 220, 220);
        color:rgb(131, 131, 131);
        cursor: not-allowed;
    `}
`;

const Arrow = styled.div<{ isOpen: boolean, disabled: boolean }>`
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent; 
    border-right: 5px solid transparent; 
    border-top: 5px solid #000000; 
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

    ${props => props.disabled && `
        border-left: 5px solid transparent; 
        border-right: 5px solid transparent;
        border-top: 5px solid #b3b3b3;
    `}
`;

const OptionListContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #ffffff;
    border: 1px solid #696969;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 10; // Ensure it appears above other elements
`;

const Option = styled.div`
    padding: 10px;
    cursor: pointer;
    font-family: 'Courier', sans-serif;

    &:hover {
        background-color: #f0f0f0; // Hover effect
        color: #000; // Change text color on hover
    }

    &:first-of-type {
        border-radius: 8px 8px 0 0;
    }

    &:last-of-type {
        border-radius: 0 0 8px 8px;
    }
`;
