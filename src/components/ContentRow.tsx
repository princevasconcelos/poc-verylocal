import React, { useRef, useCallback } from 'react'


import { useFocusable, FocusContext, FocusDetails, FocusableComponentLayout, KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation';

import styled from 'styled-components'
import Asset from './Asset'

interface ContentRowProps {
    title: string;
    onAssetPress: (props: object, details: KeyPressDetails) => void;
    onFocus: (
      layout: FocusableComponentLayout,
      props: object,
      details: FocusDetails
    ) => void;
  }

const ContentRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const ContentRowTitle = styled.span`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
  padding-left: 60px;
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 60px;
`;

const ContentRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const assets = [
    {
      title: 'Asset 1',
      color: '#714ADD'
    },
    {
      title: 'Asset 2',
      color: '#AB8DFF'
    },
    {
      title: 'Asset 3',
      color: '#512EB0'
    },
    {
      title: 'Asset 4',
      color: '#714ADD'
    },
    {
      title: 'Asset 5',
      color: '#AB8DFF'
    },
    {
      title: 'Asset 6',
      color: '#512EB0'
    },
    {
      title: 'Asset 7',
      color: '#714ADD'
    },
    {
      title: 'Asset 8',
      color: '#AB8DFF'
    },
    {
      title: 'Asset 9',
      color: '#512EB0'
    }
  ];

export default function ContentRow({
    title: rowTitle,
    onAssetPress,
    onFocus
  }: ContentRowProps) {
    const { ref, focusKey } = useFocusable({
      onFocus
    });
  
    const scrollingRef = useRef<HTMLDivElement>(null);
  
    const onAssetFocus = useCallback(
      ({ x }: { x: number }) => {
        if (!scrollingRef.current) return
        scrollingRef.current.scrollTo({
          left: x,
          behavior: 'smooth'
        });
      },
      [scrollingRef]
    );

    return (
      <FocusContext.Provider value={focusKey}>
        <ContentRowWrapper ref={ref}>
          <ContentRowTitle>{rowTitle}</ContentRowTitle>
          <ContentRowScrollingWrapper ref={scrollingRef}>
            <ContentRowScrollingContent>
              {assets.map(({ title, color }) => (
                <Asset
                  key={title}
                  title={title}
                  color={color}
                  onEnterPress={onAssetPress}
                  onFocus={onAssetFocus}
                />
              ))}
            </ContentRowScrollingContent>
          </ContentRowScrollingWrapper>
        </ContentRowWrapper>
      </FocusContext.Provider>
    );
  }