import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  articleid: string;
  title: string;
  category: string;
  publicationDate: string;
  image: string;
  description: string;
}

export default function NewsItem({
  articleid,
  title,
  category,
  publicationDate,
  image,
  description,
}: Props) {
  const formatDate = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const optionsDate: object = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", optionsDate);
  };

  return (
    <ContentItem>
      <Link to={`/article/${articleid}`}>
        <img src={image} />
        <div className="previewcontent">
          <h4 className="title">{title}</h4>
          <span className="category">{category}</span>
          <span>
            <b>{formatDate(publicationDate)}</b>
          </span>
          <p className="content">{description}</p>
          <a href="" className="Readmore ">
            Read more ...
          </a>
        </div>
      </Link>
    </ContentItem>
  );
}
const ContentItem = styled.li`
  list-style: none;
  padding: 0px 10px;
  width: 100%;

  max-width: 400px;

  align-items: center;
  border-bottom: 1px solid #242424;
  margin-bottom: 20px;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .previewcontent {
    padding: 10px;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;

    .title {
      font-size: 20px;
    }

    span {
      padding-top: 10px;
    }
    .category {
      color: #6e88cc;
    }

    p.content {
      max-width: 400px;
      font-size: 14px;
      padding-top: 10px;
    }

    a.Readmore {
      padding-top: 20px;
      color: #6e88cc;
    }

    @media (min-width: 500px) {
    }
  }
`;
