import * as cheerio from "cheerio";
import iconv from "iconv-lite";
import axios from "axios";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import db from "./index.js";


// URL 설정


// 비동기 함수 작성
const fetchArticleLinks = async () => {
  try {
    for (let i = 1; i <= 2; i++) {

      const url = `https://cafe.naver.com/ArticleList.nhn?search.clubid=14674572&search.menuid=96&search.boardtype=L&search.totalCount=151&search.cafeId=14674572&search.page=${i}`;
      const { data } = await axios.get(url, {
        responseType: "arraybuffer",
        responseEncoding: "binary",
        transformResponse: [data => iconv.decode(data, "EUC-KR")]
      });
      // cheerio를 사용하여 HTML 파싱
      const $ = cheerio.load(data);

      const tr = $("tr");

      // 'a.article' 클래스의 모든 링크를 찾고 href 속성 가져오기
      tr.each(async (index, element) => {
        const articleElement = $(element).find("td.td_article div.board-list div.inner_list a.article");
        const dateElement = $(element).find("td.td_date");
        const essay_href = "https://cafe.naver.com" + $(articleElement).attr("href") || "";
        const essay_title = $(articleElement).text().trim() || "";
        const essay_date = $(dateElement).text() || "";
        console.log(essay_href);
        console.log(essay_title);
        console.log(essay_date);
        // 새 문서 데이터
        const newEssayRef = doc(collection(db, "passing-essay"));
        const newEssayData = {
          essay_href: essay_href,
          assay_title: essay_title,
          essay_date: essay_date
        };
        // 문서 추가
        await setDoc(newEssayRef, newEssayData);
      });
    }
  } catch (error) {
    console.error("Error fetching the page:", error);
  }
  return {};
};

// 함수 호출
export default fetchArticleLinks;
