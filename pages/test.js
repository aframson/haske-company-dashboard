import React from "react";
import PropTypes from "prop-types";

function Test(props) {

    const [loading, setLoading] = React.useState(false)
  // create a function to fetch json file from firebase storage and read the contents
  const fetchJson = async () => {
    setLoading(true)

    const response = await fetch(
      "https://firebasestorage.googleapis.com/v0/b/haske-admin.appspot.com/o/c39m932w5fgnot_a_novice_embeddings.json?alt=media&token=e439cd6e-aad7-4acf-afad-de9ac8ca8514",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();
    console.log("want", data);
    setLoading(false)


    
  };


  async function fetchJsonFromFirebaseStorage(url) {
    try {
    setLoading(true)

      const response = await fetch(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const json = await response.json();
        console.log("json", json);
    setLoading(false)

      return json;
    } catch (error) {
      console.error(error);
    setLoading(false)

      return null;
    }
  }
  
  // call the function
  React.useEffect(() => {
    // fetchJson();
    fetchJsonFromFirebaseStorage("https://firebasestorage.googleapis.com/v0/b/haske-admin.appspot.com/o/c39m932w5fgnot_a_novice_embeddings.json?alt=media&token=e439cd6e-aad7-4acf-afad-de9ac8ca8514");
  }, []);

  return <div>Test:{loading?'loading...':'done'}</div>;
}

export default Test;
