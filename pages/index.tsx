import styles from '../styles/Home.module.scss';

const BLOG_URL = 'https://next-ghostcms-backend.herokuapp.com/';
const CONTENT_API_KEY = '6a57a95994a114e1b11e0c60d5';

type Post = {};

async function getPosts() {
  //curl ""
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}`
  ).then((res) => res.json());

  const titles = res.posts.map((post) => post.title);

  console.log(titles);

  return titles;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};

const Home: React.FC<{ posts: string[] }> = (props) => {
  const { posts } = props;

  return (
    <div className={styles.container}>
      <h1>Hello to my Blog</h1>
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
