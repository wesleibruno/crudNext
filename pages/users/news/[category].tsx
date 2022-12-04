function ArticleListByCategory({ articles, category }: any) {
  return (
    <>
      <h1>
        Showing news for category <i>{category}</i>
      </h1>
      {articles.map((article: any) => {
        return (
          <div key={article.id}>
            <h2 className="text-black">
              {article.id} {article.title}
            </h2>
            <p>{article.description}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}
export default ArticleListByCategory;

export async function getServerSideProps(context: any) {
  const { params, req, res, query } = context;
  console.log(query);
  console.log(req.headers.cookie)
  res.setHeader('Set-Cookie', ['name=Weslei', 'age=31'])
  console.log(req.headers.cookie)
  const { category } = params;
  const response = await fetch(`http://localhost:3001/news?category=${category}`);
  const data = await response.json();
  console.log(`Pre-rendering News Articles for category ${category}`);
  return {
    props: {
      articles: data,
      category,
    },
  };
}
