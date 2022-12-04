import Link from "next/link";

type Props = {
  id: string;
  title: string;
  description: string;
  category: string;
};

function NewsArticleList({ articles }: any) {
  return (
    <>
      <h1>List of News Articles</h1>
      {articles.map((article: Props) => {
        return (
          <div key={article.id}>
            {/* <Link href={`news/${article.id}`} passHref> */}
              <h2 className="text-black">
                {article.id} {article.title} | {article.category}
              </h2>
              <p>{article.description}</p>
            {/* </Link> */}
          </div>
        );
      })}
    </>
  );
}

export default NewsArticleList;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3001/news");
  const data = await response.json();
  console.log('Pre-redering NewsArticleList');
  
  return {
    props: {
      articles: data,
    },
  };
}
