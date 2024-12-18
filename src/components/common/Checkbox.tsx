import styled from "@emotion/styled";

interface CheckboxProps {
    value: string;
    checked: boolean;
    onChange: () => void;
}

const Checkbox = ({ value, checked, onChange }: CheckboxProps) => {
    return <CheckboxWrapper type="checkbox" value={value} checked={checked} onChange={onChange} />
}

export default Checkbox;

const CheckboxWrapper = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #D9D9D9;
  border-radius: 4px;
  margin-right: 10px;
  background-color: #D9D9D9;
  cursor: pointer;

  &:checked {
    position: relative;

    &::after {
      content: '';
      width: 12px;
      height: 12px;
      background-color: #243469;
      border-radius: 2px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;