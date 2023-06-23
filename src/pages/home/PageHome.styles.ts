import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @keyframes kf_fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation-name: kf_fadeIn;
  animation-duration: 2s;
`;

export const WelcomeText = styled.h2`
    font-size: 32px;
    color: #1A1A1E;
`;