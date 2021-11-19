import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import Image from 'next/image';
const { BLOG_URL, CONTENT_API_KEY } = process.env;

type Post = {
  title: string;
  slug: string;
  feature_image: string;
};

async function getPosts() {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt,feature_image`
  ).then((res) => res.json());

  const posts = res.posts;

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts },
    revalidate: 10,
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;

  return (
    <div className={styles.container}>
      <h1>Hello to my Blog</h1>
      <div className={styles.postList}>
        {posts.map((post) => {
          return (
            <div key={post.slug} className={styles.postitem}>
              <Link
                href='/post/[slug]'
                as={`/post/${post.slug}`}
                passHref={true}
              >
                <div className={styles.posts}>
                  <Image
                    loader={() => post.feature_image}
                    src={post.feature_image}
                    layout='responsive'
                    objectFit='cover'
                    width={6}
                    height={4}
                    alt=''
                  />
                  <a>{post.title}</a>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
