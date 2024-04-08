const customFetch = async (url, { body, ...rest }) => {
  const config = {
    ...rest,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    let response = await fetch(url, config);
    let data = await response.json();
    return data || {}; 
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default customFetch;
