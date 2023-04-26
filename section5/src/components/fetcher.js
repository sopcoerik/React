import axios from "axios";

// kLotiblFBC9keqAFRGRz5vZcvrM0CncAk-mHWZ7eruU - Access Key

const getQueryFromAPI = async (query) => {
  const result = await axios.get(`https://api.unsplash.com/search/photos`, {
    headers: {
      Authorization: `Client-ID kLotiblFBC9keqAFRGRz5vZcvrM0CncAk-mHWZ7eruU`,
    },
    params: {
      query: `${query}`,
    },
  });

  return result.data.results;
};

export default getQueryFromAPI;
