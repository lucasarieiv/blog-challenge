import { GetStaticPaths, GetStaticProps } from 'next';

import moment from 'moment';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

export default function Post({ post }): JSX.Element {
  function timeReading(text: string): string {
    const textQuant = text.split(' ');
    const time = textQuant.length / 60;

    if (time < 1) return `${time.toFixed()} seg`;

    return `${time.toFixed()} min`;
  }
  return (
    <>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <section className={styles.banner}>
        <img src={post.data.banner.url} alt={post.data.title} />
      </section>
      <main className={styles.container}>
        <div className={styles.post}>
          <strong>{post.data.title}</strong>

          <div className={styles.postInfo}>
            <time>
              <FiCalendar /> {post.first_publication_date}
            </time>
            <span>
              <FiUser /> {post.data.author}
            </span>
            <span>
              <FiClock /> {timeReading(post.data.content.body.text)}
            </span>
          </div>

          <h1 className={styles.title}>{post.data.content.heading}</h1>
          <p className={styles.text}>{post.data.content.body.text}</p>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts');

  const posts = postsResponse.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths: posts,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const { slug } = params;
  const response = await prismic.getByUID('posts', slug, {
    fetch: [
      'posts.title',
      'posts.subtitle',
      'posts.author',
      'posts.banner',
      'posts.content',
    ],
  });

  const post = {
    first_publication_date: moment(response.data.first_publication_date).format(
      'll'
    ),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: {
        heading: response.data.content[0].heading,
        body: {
          text:
            response.data.content[0].body.find(
              content => content.type === 'paragraph'
            )?.text ?? '',
        },
      },
    },
  };

  return {
    props: {
      post,
    },
  };
};
