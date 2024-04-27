import { useEffect, useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import { getNews } from "../../Apis/newsApi";
import HeaderComponent from "../../Components/HeaderComponent";

interface Source {
  id: string;
  name: string;
}
interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export default function NewsPage() {
  const [newsList, setNewsList] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    if (page >= 1) {
      // fetchNews();
    }
  }, [page]);

  const fetchNews = async () => {
    try {
      const res = await getNews(page, category);

      const articles = res.articles.filter(
        (item: any) => !item.title.includes("[Removed]") && item.urlToImage
      );
      console.log(articles);
      setNewsList([...newsList, ...articles]); // Adiciona as novas noticias às noticias existentes
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1); // Atualiza a página para buscar mais notícias
  };

  return (
    <Container>
      <HeaderComponent />
      <ContentList>
        {newsList.map((news) => (
          <NewsItem
            key={news.url}
            title={news.title}
            category="Science, Technology"
            publicationDate={news.publishedAt}
            image={news.urlToImage}
            description={news.description}
          />
        ))}
        <LoadMoreButton onClick={handleLoadMore}>
          Carregar mais notícias
        </LoadMoreButton>
      </ContentList>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const ContentList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 100px auto;
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 15px 0;
  background-color: #6e88cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* position: fixed; */
  bottom: 0;
  left: 0;
`;
