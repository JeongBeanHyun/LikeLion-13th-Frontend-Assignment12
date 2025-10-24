import "./App.css";
import SearchForm from "./components/SearchPage";
import TrendChart from "./components/TrendChart";

function App() {
  return (
    <div className="App">
      <h1>네이버 쇼핑인사이트 차트</h1>
      <SearchForm />
      <TrendChart />
    </div>
  );
}

export default App;
