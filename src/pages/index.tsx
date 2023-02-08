import { GetStaticProps } from 'next';
import Head from 'next/head';

import moment from 'moment';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

moment.locale('pt-br');

interface Post {
  uid?: string;
  updatedAt: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
  banner: string;
  excerpt: string;
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState({
    ...postsPagination,
  });

  function handleLoadMore(): void {
    if (postsPagination.next_page) {
      fetch(postsPagination.next_page)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const newPost = data.results.map(post => {
            return {
              uid: post.uid,
              data: {
                title: post.data.title,
                subtitle: post.data.subtitle,
                author: post.data.author,
              },
              banner: post.data.banner.url,
              excerpt:
                post.data.content[0].body.find(
                  content => content.type === 'paragraph'
                )?.text ?? '',
              updatedAt: moment(post.data.first_publication_date).format('ll'),
            };
          });

          const newPostPagination = {
            results: [...postsPagination.results, ...newPost],
            next_page: data.next_page,
          };

          setPosts({
            ...newPostPagination,
          });
        });
    }
  }

  return (
    <>
      <Head>
        <title>Início | Spacetravelling</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.postList}>
          {posts.results.map(post => (
            <Link href={`/post/${post.uid}`} key={post.uid}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.excerpt}</p>
                <div className={styles.postInfo}>
                  <time>
                    <FiCalendar /> {post.updatedAt}
                  </time>
                  <span>
                    <FiUser /> {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
        <a role="button" className={styles.loadMore} onClick={handleLoadMore}>
          Carregar mais
        </a>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    fetch: [
      'posts.title',
      'posts.subtitle',
      'posts.author',
      'posts.banner',
      'posts.content',
    ],
    pageSize: 1,
  });

  const posts: Post[] = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
      banner: post.data.banner.url,
      excerpt:
        post.data.content[0].body.find(content => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: moment(post.data.first_publication_date).format('ll'),
    };
  });

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
