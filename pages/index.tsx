import styles from '../styles/Home.module.scss';
import Link from 'next/link';
const BLOG_URL = 'https://next-ghostcms-backend.herokuapp.com/';
const CONTENT_API_KEY = '6a57a95994a114e1b11e0c60d5';

type Post = {
  title: string;
  slug: string;
};

async function getPosts() {
  //curl ""
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`
  ).then((res) => res.json());

  const posts = res.posts;

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;

  return (
    <div className={styles.container}>
      <h1>Hello to my Blog</h1>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={post.slug}>
              <Link href='/post/[slug]' as={`/post/${post.slug}`}>
                <a href=''>{post.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
