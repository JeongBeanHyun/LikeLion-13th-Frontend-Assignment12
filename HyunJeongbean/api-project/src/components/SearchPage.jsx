import { useState } from "react";
import { useShoppingInsight } from "../context/ShoppingInsightProvider";

const today = new Date().toISOString().split("T")[0];

function SearchForm() {
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState(today);
  const [timeUnit, setTimeUnit] = useState("month");
  const [categoryId, setCategoryId] = useState("50000000");
  const [keyword, setKeyword] = useState("아우터,스커트");

  const { fetchShoppingInsight } = useShoppingInsight();

  const handleSubmit = (e) => {
    e.preventDefault();

    const keywords = keyword
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
      .slice(0, 5);

    const keywordArray = keywords.map((k) => ({
      name: k,
      param: [k],
    }));

    const requestBody = {
      startDate,
      endDate,
      timeUnit,
      category: categoryId,
      keyword: keywordArray,
    };
    fetchShoppingInsight(requestBody);
  };

  return (
    <form onSubmit={handleSubmit} className="card search-form">
      <h2>조회 조건 설정</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="startDate">시작일</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">종료일</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeUnit">분석 단위</label>
          <select
            id="timeUnit"
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
          >
            <option value="date">일간</option>
            <option value="week">주간</option>
            <option value="month">월간</option>
          </select>
        </div>

        <div className="form-group keywords-group">
          <label htmlFor="keywords">키워드 (쉼표로 구분)</label>
          <input
            id="keywords"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="예: 아우터,스커트"
          />
        </div>

        <div className="form-group button-group">
          <button type="submit" className="submit-button">
            분석하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
