import React from "react";

export const App = () => {
  const [currentId, setCurrentId] = React.useState(1);
  const [currentShow, setCurrentShow] = React.useState(null);
  const [currentReview, setCurrentReview] = React.useState(null);

  const getMedia = async () => {
    const query = `
      query ($id: Int) {
        Media (id: $id) {
          id
          title {
            romaji
          }
          reviews {
            nodes {
              id
            }
          }
        }
      }
    `;

    const url = "https://graphql.anilist.co";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { id: currentId },
      }),
    });

    const data = await response.json();

    setCurrentShow(data.data.Media);
    const reviewId = data.data.Media.reviews.nodes[0].id;
    
    const reviewQuery = `
      query ($id: Int) {
        Review (id: $id) {
          id
          summary
          body
        }
      }
    `;

    const reviewResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: reviewQuery,
        variables: { id: reviewId },
      }),
    });

    const reviewData = await reviewResponse.json();

    setCurrentReview(reviewData.data.Review);
  };

  React.useEffect(() => {
    getMedia();
  }, []);

  return (
    <section>
      <h1>{currentShow?.title?.romaji ?? "Loading..."}</h1>
      <h2>{currentReview?.summary ?? "Loading..."}</h2>
      <pre>
        {currentReview?.body ?? "Loading..."}
      </pre>
    </section>
  );
};
