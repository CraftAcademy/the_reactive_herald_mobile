import axios from "axios";

const getCurrentArticle = async (id, language) => {
  try {
    const response = await axios.get(`/articles/${id}`, {
      params: { locale: language }
    });
    return response.data.article;
  } catch (error) {
    if (error.message === "Network Error") {
      return { error: error.message };
    } else {
      return error.response.data;
    }
  }
};

const getArticles = async (language, event) => {
  if (event) {
    const response = await axios({
      url: "/articles",
      method: "GET",
      params: { category: event.target.id, locale: language }
    });
    return response.data;
  } else {
    const response = await axios({
      url: "/articles",
      method: "GET",
      params: { locale: language }
    });
    return response.data;
  }
};

const createArticle = async (title_en, title_sv, body_en, body_sv, category, image) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    const response = await axios.post(
      "/admin/articles",
      {
        article: {
          title_en: title_en,
          title_sv: title_sv,
          body_en: body_en,
          body_sv: body_sv,
          category: category,
          image: image
        }
      },
      {
        headers: headers
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const getUnpublishedArticles = async () => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios.get(`/admin/articles`, {
      headers: headers
    });
    return response.data.articles;
  } catch (error) {
    return error.message;
  }
};

const publishArticle = async id => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios({
      url: `/admin/articles/${id}`,
      headers: headers,
      method: "PUT",
      params: {
        "[article][published]": true
      }
    });
    return response.statusText;
  } catch (error) {
    return error.message;
  }
};

const undoPublishArticle = async id => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios({
      url: `/admin/articles/${id}`,
      headers: headers,
      method: "PUT",
      params: {
        "[article][published]": false
      }
    });
    return response.statusText;
  } catch (error) {
    return error.message;
  }
};

export default {
  getCurrentArticle,
  getArticles,
  createArticle,
  getUnpublishedArticles,
  publishArticle,
  undoPublishArticle
};
