import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Title = () => {
    const navigate = useNavigate();
    return <H3 onClick={() => navigate("/")}>SURE CODE REVIEW</H3>
}

const H3 = styled.h3`
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    width: 100%;
    text-align: center;
    color: #243469;
    cursor: pointer;
`

export default Title;