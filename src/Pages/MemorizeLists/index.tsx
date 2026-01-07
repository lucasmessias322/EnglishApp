import styled from "styled-components";
import HeaderComponent from "../../Components/HeaderComponent";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getMemorizes, getUserMemorizes } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import LoadingComp from "../../Components/LoadingComp";

interface memotypes {
  _id: string;
  title: string;
  flashcards: [];
}

export default function MemorizeLists() {
  const [memoList, setMemoList] = useState<memotypes[]>([]);
  const [memoTextAndNews, setmemoTextAndNews] = useState<memotypes[]>([]);
  const [publicMemos, setpublicMemos] = useState<memotypes[]>([]);
  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    async function getAllMemos() {
      await getMemorizes(token).then((res) => {
        setpublicMemos(res);
      });
      await getUserMemorizes(userId, token).then((response) => {
        setmemoTextAndNews(response);
      });
    }
    getAllMemos();
  }, []);

  useEffect(() => {
    if (memoTextAndNews && publicMemos) {
      setMemoList([...memoTextAndNews, ...publicMemos]);
    }
  }, [memoTextAndNews, publicMemos]);

  return (
    <Container>
      <HeaderComponent bgcolor="#212433" fixed loginSignin />

      {memoList.length === 0 ? (
        <LoadingComp />
      ) : (
        <DefaultDecksWrapper>
          <DecksList>
            <h2>Listas de Memorizaçao:</h2>
            {memoList?.map((item) =>
              item.flashcards.length > 0 ? (
                <DeckItem key={item._id}>
                  <Link to={`/memolist/${item._id}`}>
                    <h4>{item.title}</h4>
                    <span>{item.flashcards.length} palavras</span>
                  </Link>
                </DeckItem>
              ) : null
            )}
          </DecksList>
        </DefaultDecksWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const DefaultDecksWrapper = styled.section`
  margin-top: 60px;
  padding: 20px;
`;

const DecksList = styled.ul`
  width: 100%;
  padding: 0px;
  margin-top: 20px;
  max-width: 400px;
`;

const DeckItem = styled.li`
  list-style: none;
  margin-top: 10px;
  a {
    display: flex;
    flex-direction: column;

    padding: 15px;

    border-radius: 10px;
    border: 1px solid #353a52;
    h4 {
    }
    span {
      padding: 5px 0px;
      color: #828282;
      font-size: 13px;
    }

    &:hover {
      transition: all 0.2s ease-out;
      margin-left: 10px;
      background-color: #353a52;
    }
  }
`;
