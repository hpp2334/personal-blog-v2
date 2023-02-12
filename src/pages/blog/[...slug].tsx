import Head from 'next/head'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getPost, getPosts } from '@/data/posts.data'
import Link from 'next/link'
import { getPostHref, Post, PostMeta } from '@/core/post.core'

interface UrlQuery {
    slug: string[]
    draft?: string;

    [key: string]: string | string[] | undefined;
}

interface Props {
    post: Post
}

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
    const metas = await getPosts();

    return {
        paths: metas.map(meta => {
            const slug = meta.path.split('/').filter(Boolean);
            const draft = meta.draft ? '1' : undefined;
            return {
                params: {
                    slug,
                    draft,
                }
            }
        }),
        fallback: false, // can also be true or 'blocking'
    }
}

export const getStaticProps: GetStaticProps<Props, UrlQuery> = async (context) => {
    const slug = context.params?.slug ?? [];
    const draft = Boolean(context.params?.draft);
    const post = await getPost(slug, draft);

    if (!post) {
        return {
            notFound: true,
        }
    }
    
    return {
        props: {
            post
        }, // will be passed to the page component as props
    }
}


export default function Blog(props: Props) {
    const { post } = props;

    return (
        <>
            <Head>
                <title>{post.meta.title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                DETAIL
            </main>
        </>
    )
}
