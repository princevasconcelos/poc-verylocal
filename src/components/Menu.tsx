import React from 'react'

import { useFocusable, FocusContext, FocusDetails, FocusableComponentLayout, KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation';

  import styled from 'styled-components'
import { MenuWrapper } from '../components/MenuWrapper'

interface MenuProps {
    focusKey: string;
    data: any;
}

interface MenuItemBoxProps {
    focused: boolean;
  }
  
  const MenuItemBox = styled.div<MenuItemBoxProps>`
    width: 171px;
    height: 51px;
    background-color: #b056ed;
    border-color: white;
    border-style: solid;
    border-width: ${({ focused }) => (focused ? '6px' : 0)};
    box-sizing: border-box;
    border-radius: 7px;
    margin-bottom: 37px;
    display: flex;
    justify-content: center;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    padding: 4px;
  `;

function MenuItem({ children }: any) {
    const { ref, focused } = useFocusable();
  
    return <MenuItemBox ref={ref} focused={focused}>{children}</MenuItemBox>;
}

const NmLogo = styled.img`
  height: 57px;
  width: 175px;
  margin-bottom: 51px;
`;
  
export default function Menu({ focusKey: focusKeyParam, data }: MenuProps) {
    const {
      ref,
      focusSelf,
      hasFocusedChild,
      focusKey
      // setFocus, -- to set focus manually to some focusKey
      // navigateByDirection, -- to manually navigate by direction
      // pause, -- to pause all navigation events
      // resume, -- to resume all navigation events
      // updateAllLayouts, -- to force update all layouts when needed
      // getCurrentFocusKey -- to get the current focus key
    } = useFocusable({
      focusable: true,
      saveLastFocusedChild: false,
      trackChildren: true,
      autoRestoreFocus: true,
      isFocusBoundary: false,
      focusKey: focusKeyParam,
      preferredChildFocusKey: '',
      onEnterPress: () => {},
      onEnterRelease: () => {},
      onArrowPress: () => true,
      onFocus: () => {},
      onBlur: () => {},
      extraProps: { foo: 'bar' }
    });

    console.log('prince menu', data)
  
    React.useEffect(() => {
      focusSelf();
    }, [focusSelf]);
  
    return (
      <FocusContext.Provider value={focusKey}>
        <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
          <NmLogo src="logo.svg" />
          {data.length > 0 && data.map((station: any) => <MenuItem>{station}</MenuItem>)}
        </MenuWrapper>
      </FocusContext.Provider>
    );
  }