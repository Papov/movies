export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "f3b6bf0826b03d53c7be6ac7c02b226c";

export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I2YmYwODI2YjAzZDUzYzdiZTZhYzdjMDJiMjI2YyIsInN1YiI6IjViM2IyYjkzMGUwYTI2NmUzMDAxODM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aTU0qAPwjdc_1Pvq4s-zLtLQzLJZTj-QvkxnW60jDms";

export const fetchUrl = (url, body = {}) => {
  /*FETCHING URL TO GET TOKENS*/
  return new Promise((resolve, reject) => {
    const link = `${API_URL}${url}`;
    fetch(link, body)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        });
      });
  });
};

export const api_urls = {
  first_token: `/authentication/token/new?api_key=${API_KEY_3}`,
  validate_with_login: `/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
  session: `/authentication/session/new?api_key=${API_KEY_3}`,
  account: `/account?api_key=${API_KEY_3}&session_id=`,
  discover: `/discover/movie?`
};
