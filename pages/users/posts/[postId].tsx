type Post = {
  id: number;
  title: string;
  body: string;
};



function Post({ post }: { post: Post }) {
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}

export async function getStaticPaths() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const data = await res.json();
  // const paths = data.map((post: Post) => {
  //   return {
  //     params: {
  //       postId: post.id.toString(),
  //     },
  //   };
  // });

  return {
    paths: [
      {
        params: {postId: "1"},
      },
      {
        params: {postId: "2"},
      },
      {
        params: {postId: "3"},
      },
    ],
    // paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
}

export default Post;
