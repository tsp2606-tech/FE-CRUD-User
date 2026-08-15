const baseURL = import.meta.env.VITE_API_URL || "/api";

const buildURL = (path) => `${baseURL}${path}`;

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
};

const request = async (path, options = {}) => {
  const response = await fetch(buildURL(path), {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const error = new Error(data?.error || data?.message || "Request failed");
    error.response = {
      data,
      status: response.status,
    };
    throw error;
  }

  return data;
};

const axiosInstance = {
  get: (path) => request(path),
  post: (path, data) =>
    request(path, {
      body: JSON.stringify(data),
      method: "POST",
    }),
  put: (path, data) =>
    request(path, {
      body: JSON.stringify(data),
      method: "PUT",
    }),
  delete: (path) =>
    request(path, {
      method: "DELETE",
    }),
};

export default axiosInstance;
