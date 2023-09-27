import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "@styles/global-styles";
import { Reset } from "styled-reset";
import { App } from "./pages/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { camelToSnake, snakeToCamel } from "./utils/snakeCamelConverter.ts";

axios.defaults.baseURL = "http://localhost:8001/api/v1";
axios.interceptors.request.use((config) => {
  if (config.data) config.data = camelToSnake(config.data);
  if (config.params) config.params = camelToSnake(config.params);

  return config;
});
axios.interceptors.response.use((response) => {
  if (response.data) response.data = snakeToCamel(response.data);
  return response;
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
