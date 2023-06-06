import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import styled, { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import { init } from '@noriginmedia/norigin-spatial-navigation';
import axios from 'axios'

import Menu from '../src/components/Menu'
import Content from '../src/components/Content'

const AppContainer = styled.div`
  background-color: #221c35;
  width: 1440px;
  height: 810px;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

const IndexPage: NextPage = () => {
  init({
    debug: false,
    visualDebug: false
  });
  const [currentMarket, setCurrentMarket] = React.useState('')
  const [markets, setMarkets] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)


  // const initNavigation = () => {
  //   alert('foi')
  // }

  // React.useEffect(() => {
  //   document.addEventListener('load', initNavigation)
  //   return () => document.removeEventListener('load', initNavigation)
  // }, [])

  const getMarketData = async () => {
    setLoading(true)
    try {
      const [marketList, currentMarket] = await Promise.allSettled([
        axios.get('https://us-central1-hearsttelevision-158321.cloudfunctions.net/dev-1-ipman/markets').then(r => r.data),
        axios.get('https://us-central1-hearsttelevision-158321.cloudfunctions.net/dev-1-ipman/matchMarket').then(r => r.data),
      ])

      marketList.status === 'fulfilled' && setMarkets(marketList.value.stations)
      currentMarket.status === 'fulfilled' && setCurrentMarket(currentMarket.value.market)
    } catch (error) {
      console.log('prince error', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getMarketData()

    init({
      debug: false,
      visualDebug: false
    });
  }, [])

  if (isLoading) return <span>Loading...</span>

  return (
    <AppContainer>
      <GlobalStyle />
      <Menu focusKey="MENU" data={Object.keys(markets)} />
      <Content />
    </AppContainer>
  )
}

export default IndexPage
