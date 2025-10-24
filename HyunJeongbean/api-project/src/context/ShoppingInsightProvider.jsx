import { createContext, useContext, useState } from "react";
import axios from "axios";

const ShoppingInsightContext = createContext();

export function ShoppingInsightProvider({ children }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShoppingInsight = async (requestBody) => {
    setLoading(true);
    setError(null);
    setChartData(null);

    try {
      const response = await axios.post(
        "/v1/datalab/shopping/category/keywords",
        requestBody,
        {
          headers: {
            "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": import.meta.env.VITE_NAVER_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
        }
      );

      setChartData(response.data.results);
    } catch (e) {
      if (e.response) {
        setError(
          `API 오류 (Status ${e.response.status}): ${e.response.data.errorMessage}`
        );
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    chartData,
    loading,
    error,
    fetchShoppingInsight,
  };

  return (
    <ShoppingInsightContext.Provider value={value}>
      {children}
    </ShoppingInsightContext.Provider>
  );
}

export function useShoppingInsight() {
  const context = useContext(ShoppingInsightContext);
  if (!context) {
    throw new Error(
      "Cannot use useShoppingInsight outside of ShoppingInsightProvider"
    );
  }
  return context;
}
