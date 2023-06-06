import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// const DynamicCustomAccordion = dynamic(() => import('@app/components/CustomAccordion'))

function CentralAtendimento({ status }: any) {
  const { query, push, pathname } = useRouter()

  return (
    <div>
        <h1>Pagina Settings</h1>
        <p>currentMarket: {status}</p>
    </div>
  )
}

export async function getServerSideProps() {
    return {
      props: {
        status: 'legal'
      }
    }
}

export default CentralAtendimento
