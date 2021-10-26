import React, { useEffect, useState } from "react";
import firebase from "../../service/firebaseConnection.js";
import { ToastContainer, toast } from "react-toastify";
import "./style.scss";
import { Link } from "react-router-dom";

function Homecomp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nota, setNota] = useState("");

  async function sendBug(e) {
    await firebase
      .firestore()
      .collection("Notas-De-Bugs")
      .add({
        name: name,
        email: email,
        nota: nota,
      })
      .then(() => {
        console.log("DADOS ENVIADOS COM SUCESSO");
        toast(
          `Relatorio enviado com sucesso, Obrigado pela colaboraçao ${name}! ;)`
        );
        setName("");
        setEmail("");
        setNota("");
      })
      .catch((error) => {
        console.log("GEROU ALGUM ERRO: " + error);
      });
  }

  function ValidarForm(e) {
    e.preventDefault();
    if (name === "" && email === "" && nota === "") {
      toast(`Preencha todos os campos!`);
    } else {
      sendBug();
    }
  }

  return (
    <div className="Home-Page">
      <div className="container">
        <section className="cta">
          <div>
            <div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <h2>
                Aprenda Ingles com textos <br />
                <span>
                  <b>gratuitamente</b>
                </span>
              </h2>
              <br />
              <br />
              <Link to="/dashboard">
                <button>Aprender Agora</button>
              </Link>
            </div>
          </div>
        </section>

        <section className="site-information">
          <p>
            <b>
              Esse site é completamante gratuito e ele sempre sera, nosso
              objetivo é ajudar a quem quer que seja a estudar ingles de uma
              forma mais calma e divertida, esse site esta em fase de
              desenvolvimento, viu algum bug? mande um email no formulario
              abaixo. Obrigado!
            </b>
          </p>
          <br />
          <form onSubmit={(e) => ValidarForm(e)}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              placeholder="Qual é seu nome?"
            />
            <br />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Qual é seu Email?"
            />
            <br />
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              required
              placeholder="Sua nota aqui..."
            ></textarea>
            <br />
            <button>Enviar</button>
          </form>
          <br />
          <br />
        </section>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Homecomp;
