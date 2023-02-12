import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import { getPosts } from '@/data/posts.data'
import Link from 'next/link'
import { getPostHref, PostMeta } from '@/core/post.core'


interface Props {
  metas: PostMeta[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const metas = await getPosts();
  return {
    props: {
      metas
    }, // will be passed to the page component as props
  }
}


export default function Home(props: Props) {
  const { metas } = props;

  return (
    <>
      <Head>
        <title>GrayWood</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>DEBUG: meta length {metas.length}</div>
        <div>
          {metas.map((meta, index) => (
            <Link key={index} href={getPostHref(meta)}>
              {meta.title}
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
