import styled from 'styled-components'

interface MenuWrapperProps {
    hasFocusedChild: boolean;
  }
  
export const MenuWrapper = styled.div<MenuWrapperProps>`
  flex: 1;
  max-width: 246px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ hasFocusedChild }) =>
      hasFocusedChild ? '#4e4181' : '#362C56'};
  padding-top: 37px;
  overflow: hidden;
`;