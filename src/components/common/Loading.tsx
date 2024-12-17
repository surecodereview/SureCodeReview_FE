import styled from '@emotion/styled';
import SpinnerImage from "@assets/spinner.gif";

const Loading = () => {
    return (
        <LoadingOverlay>
            <Spinner src={SpinnerImage} alt="Loading..." />
        </LoadingOverlay>
    );
};

export default Loading;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은색 배경 */
  display: flex;
  justify-content: center !important;
  align-items: center;
  z-index: 9999; /* 다른 요소들 위에 표시 */
`;

const Spinner = styled.img`
  width: 128px; /* GIF의 크기를 조정 */
  height: auto; /* 비율 유지 */
`;
