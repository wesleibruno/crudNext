import { slice } from "lodash";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
};

function PostList({ posts }: { posts: Post[] }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`} passHref>
              <h2 className="text-black">
                {post.id} {post.title}
              </h2>
              <p>{post.body}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  console.log(`Generating / Regenerating ProductList`);
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return {
    props: {
      posts: data,
    },
    revalidate: 10,
  };
}

export default PostList;
