import React, { useState, useCallback } from 'react'

  import { useFocusable, FocusContext, FocusDetails, FocusableComponentLayout, KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation';

import styled from 'styled-components'
import ContentRow from '../components/ContentRow'
import shuffle from 'lodash/shuffle';

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

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  color: white;
  font-size: 48px;
  font-weight: 600;
  font-family: 'Segoe UI';
  text-align: center;
  margin-top: 52px;
  margin-bottom: 37px;
`;

const SelectedItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedItemBox = styled.div`
  height: 282px;
  width: 1074px;
  background-color: ${({ color }) => color};
  margin-bottom: 37px;
  border-radius: 7px;
`;

const SelectedItemTitle = styled.div`
  position: absolute;
  bottom: 75px;
  left: 100px;
  color: white;
  font-size: 27px;
  font-weight: 400;
  font-family: 'Segoe UI';
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

interface SelectedAssert {
  color: string
  title: string
}

export default function Content() {
    const rows = [
        {
          title: 'Recommended'
        },
        {
          title: 'Movies'
        },
        {
          title: 'Series'
        },
        {
          title: 'TV Channels'
        },
        {
          title: 'Sport'
        }
      ]
    const { ref, focusKey } = useFocusable();
  
    const [selectedAsset, setSelectedAsset] = useState<SelectedAssert | null>(null);
  
    // asset: AssetProps
    const onAssetPress = useCallback((props: any) => {
      setSelectedAsset(props.asset);
    }, []);
  
    const onRowFocus = useCallback(
      ({ y }: { y: number }) => {
        ref.current.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      },
      [ref]
    );
  
    return (
      <FocusContext.Provider value={focusKey}>
        <ContentWrapper>
          <ContentTitle>Norigin Spatial Navigation</ContentTitle>
          <SelectedItemWrapper>
            <SelectedItemBox
              color={selectedAsset ? selectedAsset.color : '#565b6b'}
            />
            <SelectedItemTitle>
              {selectedAsset
                ? selectedAsset.title
                : 'Press "Enter" to select an asset'}
            </SelectedItemTitle>
          </SelectedItemWrapper>
          <ScrollingRows ref={ref}>
            <div>
              {rows.map(({ title }) => (
                <ContentRow
                  key={title}
                  title={title}
                  onAssetPress={onAssetPress}
                  onFocus={onRowFocus}
                />
              ))}
            </div>
          </ScrollingRows>
        </ContentWrapper>
      </FocusContext.Provider>
    );
  }