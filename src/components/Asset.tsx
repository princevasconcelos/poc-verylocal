import React, { useState, useCallback } from 'react'
import { useFocusable, FocusDetails, FocusableComponentLayout, KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation';
import styled from 'styled-components'
import ContentRow from './ContentRow'

const AssetWrapper = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
`;

interface AssetProps {
    title: string;
    color: string;
    onEnterPress: (props: object, details: KeyPressDetails) => void;
    onFocus: (
      layout: FocusableComponentLayout,
      props: object,
      details: FocusDetails
    ) => void;
  }

  interface AssetBoxProps {
    focused: boolean;
    color: string;
  }

const AssetBox = styled.div<AssetBoxProps>`
  width: 225px;
  height: 127px;
  background-color: ${({ color }) => color};
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
`;

const AssetTitle = styled.div`
  color: white;
  margin-top: 10px;
  font-family: 'Segoe UI';
  font-size: 24px;
  font-weight: 400;
`;

export default function Asset({ title, color, onEnterPress, onFocus }: AssetProps) {
    const { ref, focused } = useFocusable({
      onEnterPress,
      onFocus,
      extraProps: {
        title,
        color
      }
    });
  
    return (
      <AssetWrapper ref={ref}>
        <AssetBox color={color} focused={focused} />
        <AssetTitle>{title}</AssetTitle>
      </AssetWrapper>
    );
  }