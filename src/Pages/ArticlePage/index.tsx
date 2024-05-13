import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getArticle } from "../../Apis/newsApi";

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

export default function ArticlePage() {
  const { articleid } = useParams();
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    getArticle(articleid).then((res) => {
      setArticle(res[0]);
      console.log(res[0]);
    });
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <h2 className="title">{article?.title}</h2>
        <p className="description">{article?.description}</p>
        <img src={article?.urlToImage} />
        <p className="content">{article?.content}</p>
      </ContentWrapper>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 10px;
  max-width: 600px;
  margin: auto;

  img {
    width: 100%;
    /* max-height: 250px; */
    /* object-fit: contain; */
    /* padding: 10px; */
    margin: 20px 0px;
    border-radius: 10px;
  }
  h2.title {
    margin: auto;

    font-size: 30px;
  }

  p.description {
    margin: 10px 0px;
    font-size: 12px;
  }

  p.content{}
`;
