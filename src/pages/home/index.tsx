import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import styled, { createGlobalStyle } from 'styled-components'
import { init } from '@noriginmedia/norigin-spatial-navigation';

import Menu from '../../components/Menu'
import Content from '../../components/Content'

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

// const DynamicCustomAccordion = dynamic(() => import('@app/components/CustomAccordion'))

function HomePage({ marketList, currentMarket}: any) {
  const { query, push, pathname } = useRouter()
  const [isLoading, setLoading] = React.useState(false)
  init({
    debug: false,
    visualDebug: false
  });

  if (isLoading) return <span>Loading...</span>

  return (
    <AppContainer>
      <GlobalStyle />
      <Menu focusKey="MENU" data={Object.keys(marketList)} />
      <Content />
    </AppContainer>
  )
}

export async function getServerSideProps() {
    const [marketsResponse, matchMarketResponse] = await Promise.allSettled([
        axios.get('https://us-central1-hearsttelevision-158321.cloudfunctions.net/dev-1-ipman/markets').then(r => r.data),
        axios.get('https://us-central1-hearsttelevision-158321.cloudfunctions.net/dev-1-ipman/matchMarket').then(r => r.data),
      ])

    // const { data } = await frontApi({
    //   url: `${process.env.PRIVATE_FRONT_API}/faq`,
    //   method: 'get',
    // })

    const marketList = marketsResponse.status === 'fulfilled' ? marketsResponse.value.stations : []
    const currentMarket = matchMarketResponse.status === 'fulfilled' ? matchMarketResponse.value.market : ''

    return {
      props: {
        marketList,
        currentMarket
      }
    }
}

export default HomePage
