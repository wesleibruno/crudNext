// import { useRouter } from "next/router";
var url = process.env.URL;
type Post = {
  id: number;
  title: string;
  body: string;
};

function Post({ post }: { post: Post }) {
  // const router = useRouter();

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

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
        params: { postId: "1" },
      },
      {
        params: { postId: "2" },
      },
      {
        params: { postId: "3" },
      },
    ],
    // paths,
    fallback: 'blocking',
    //fallback:true cria em tempo real novos posts
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;
  console.log(`Generating / Regenerating Post ${params.postId}`);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = await res.json();

  if(!post.id){
    return {
      notFound: true,
    }
  }

  console.log(`Generating page for /posts/${params.postId}`);
  return {
    props: {
      post,
    },
  };
}

export default Post;
