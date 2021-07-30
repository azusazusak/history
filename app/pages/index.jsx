/* global fetch */
import Head from 'next/head'
import { useEffect, useState } from 'react'

import styles from './index.module.css'
import { get as getGalleries } from '../src/lib/galleries'

export async function getStaticProps() {
  return {
    props: await getGalleries(),
  }
}

const Home = ({ galleries }) => {
  const [captions, setCaptions] = useState(null)
  const getCaptions = async () => {
    const response = await fetch('/api/galleries/demo/albums/sample')
    const result = await response.json()

    setCaptions(result.album.items.map((item) => <li>{item.caption}</li>))
  }

  useEffect(() => {
    console.log('captions', getCaptions())
  }, [])

  if (captions === null) {
    return <div>Pending</div>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>List of Galleries</h1>
        <p>{JSON.stringify(galleries)}</p>

        <ul>{captions}</ul>
      </main>
    </div>
  )
}

export default Home
