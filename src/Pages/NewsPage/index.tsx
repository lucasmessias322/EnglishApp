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
  _id: string;
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

  useEffect(() => {
    getNews().then((res) => {
      if (res && res.length > 0) {
        const articles = res?.filter(
          (item: any) => !item.title?.includes("[Removed]") && item.urlToImage
        );
        setNewsList(articles);
      }
    });
  }, []);

  return (
    <Container>
      <HeaderComponent />
      <ContentList>
        {newsList.map((news) => (
          <NewsItem
            articleid={news._id}
            key={news.url}
            title={news.title}
            category="Science, Technology"
            publicationDate={news.publishedAt}
            image={news.urlToImage}
            description={news.description}
          />
        ))}
        {/* <LoadMoreButton onClick={handleLoadMore}>
          Carregar mais notícias
        </LoadMoreButton> */}
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
