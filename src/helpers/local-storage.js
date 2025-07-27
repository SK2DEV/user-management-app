export const saveToken = (token, remember) => {
  if (remember) {
    localStorage.setItem("authToken", token);
  } else {
    sessionStorage.setItem("authToken", token);
  }
};

export const getToken = () => {
  return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
};

export const clearToken = () => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
};