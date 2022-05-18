import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listServerlessApps } from "./graphql/queries";
import { createServerlessApp, deleteServerlessApp } from "./graphql/mutations";
// import { onCreateServerlessApp } from "./graphql/subscriptions";

import "./App.css";
import { default as lightX } from "./asset/x-button-light-mode.svg";
import { default as darkX } from "./asset/x-button-dark-mode.svg";
import { default as lightRefresh } from "./asset/refresh-button-light-mode.svg";
import { default as darkRefresh } from "./asset/refresh-button-dark-mode.svg";

function App() {
  const [formData, setFormData] = useState({
    author: "",
    text: "",
  });
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [feeds, setFeeds] = useState([]);
  const fetchFeeds = async () => {
    const request = await API.graphql(graphqlOperation(listServerlessApps));
    request.data.listServerlessApps.items.sort(function (a, b) {
      if (a.createdAt > b.createdAt) return -1;
      else if (a.createdAt === b.createdAt) return 0;
      else return 1;
    });
    setFeeds(request.data.listServerlessApps.items);
  };
  // const realtimeFeeds = () => {
  //   API.graphql(graphqlOperation(onCreateServerlessApp)).subscribe({
  //     next: ({ value: { data } }) =>
  //       setFeeds((prev) => [{ ...data.onCreateServerlessApp }, ...prev]),
  //   });
  // };

  useEffect(() => {
    fetchFeeds();
    // realtimeFeeds();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await API.graphql(
      graphqlOperation(createServerlessApp, { input: formData })
    );
    setFormData((prev) => ({ ...prev, text: "" }));
    fetchFeeds();
  };

  const onDelete = async (feedId) => {
    await API.graphql(
      graphqlOperation(deleteServerlessApp, { input: { id: feedId } })
    );
    fetchFeeds();
  };

  const onDeleteAll = (event) => {
    event.preventDefault();
    feeds.forEach(async (feed) => {
      await API.graphql(
        graphqlOperation(deleteServerlessApp, { input: { id: feed.id } })
      );
    });
    setFormData(() => ({ author: "", text: "" }));
    fetchFeeds();
  };

  return (
    <div className="wrapper">
      <main className="container">
        <h1>Serverless App!</h1>
        <section>
          <h3>Enter anything!</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="author"
              required
              placeholder="What is your name?"
              onChange={onChange}
              value={formData.author}
            />
            <textarea
              className="textarea"
              name="text"
              required
              placeholder="What is on your mind?"
              onChange={onChange}
              value={formData.text}
            />
            <button>Post!</button>
          </form>
        </section>
        <hr />
        <section>
          <div className="title_wrapper">
            <h3 className="title_text">Timeline</h3>
            <img
              className="lightRefresh"
              onClick={() => fetchFeeds()}
              src={lightRefresh}
              alt=""
            />
            <img
              className="darkRefresh"
              onClick={() => fetchFeeds()}
              src={darkRefresh}
              alt=""
            />
          </div>
          {feeds.length === 0 ? (
            <div>
              <article>
                <hgroup className="hgroup">
                  <h4 className="text">
                    There is no feed. Please enter your feed.
                  </h4>
                </hgroup>
              </article>
            </div>
          ) : (
            <div>
              {feeds.map((feed) => (
                <article className="article" key={feed.id}>
                  <img
                    className="lightX"
                    onClick={() => onDelete(feed.id)}
                    src={lightX}
                    alt=""
                  />
                  <img
                    className="darkX"
                    onClick={() => onDelete(feed.id)}
                    src={darkX}
                    alt=""
                  />
                  <hgroup className="hgroup">
                    <h4>{feed.text}</h4>
                    <h5 className="article_footer">{`${feed.author}, ${new Date(
                      feed.createdAt
                    ).toLocaleString("ko-KR")}`}</h5>
                  </hgroup>
                </article>
              ))}
              <button onClick={onDeleteAll}>Delete!</button>
            </div>
          )}
        </section>
      </main>
      <div className="footer">
        <hgroup className="footer_left">
          <h6 className="footer_text">Contact:</h6>
          <a className="a-tag" href={`mailto:${process.env.REACT_APP_EMAIL}`}>
            <h6 className="footer_email">{process.env.REACT_APP_EMAIL}</h6>
          </a>
        </hgroup>
        <hgroup className="footer_right">
          <h6 className="footer_text">{`Serverless App v${process.env.REACT_APP_VERSION}`}</h6>
        </hgroup>
      </div>
    </div>
  );
}

export default App;
