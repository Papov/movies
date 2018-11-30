import queryString from "query-string";

export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "f3b6bf0826b03d53c7be6ac7c02b226c";

export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I2YmYwODI2YjAzZDUzYzdiZTZhYzdjMDJiMjI2YyIsInN1YiI6IjViM2IyYjkzMGUwYTI2NmUzMDAxODM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aTU0qAPwjdc_1Pvq4s-zLtLQzLJZTj-QvkxnW60jDms";

export const fetchUrl = (url, body = {}) => {
  /*FETCHING URL TO GET TOKENS*/
  return new Promise((resolve, reject) => {
    fetch(url, body)
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

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchUrl(
      `${API_URL}${url}?${queryString.stringify(queryParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json;charset=utf-8"
        }
      }
    );
  }
  static post(url, options = {}){
    const {params = {}, body = {}} = options;
    const queryParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchUrl(`${API_URL}${url}?${queryString.stringify(queryParams)}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  }
  static delete(url, options = {}){
    const {params = {}, body = {}} = options;
    const queryParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchUrl(`${API_URL}${url}?${queryString.stringify(queryParams)}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  }
}
