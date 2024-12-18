import styled from "@emotion/styled";
import Title from "@/components/common/Title";
import { Container } from "@/components/common/Container";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { useSetRecoilState } from "recoil";
import { Target, targetState } from "@/recoil/atoms/targetState";
import { useEffect } from "react";
import { branchState } from "@/recoil/atoms/branchState";

const ChoosePage = () => {
    const navigate = useNavigate();
    const setTarget = useSetRecoilState(targetState);
    const setBranch = useSetRecoilState(branchState);

    useEffect(() => {
        setBranch("");
    }, [])

    const handleButtonClick = (target: Target) => {
        setTarget(target);
        navigate("/setting");
        console.log(target)
    }

    return <>
        <Container>
            <Title />
            <Content>
                <Button onClick={() => handleButtonClick("local")}>
                    로컬 저장소<br />코드 분석하기
                </Button>
                <Button onClick={() => handleButtonClick("remote")}>
                    원격 저장소<br />코드 분석하기
                </Button>
            </Content>

        </Container>
    </>
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    justify-content: center;
    padding: 0 2rem;
    padding-bottom: 5rem;
`

export default ChoosePage;