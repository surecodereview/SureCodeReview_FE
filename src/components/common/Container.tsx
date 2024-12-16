import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 600px;
  width: 100%;
  height: 100%;
  padding: 2rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 36px;
  box-sizing: border-box;

  > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 36px;
   }
`;