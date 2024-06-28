import * as cheerio from "cheerio";
import iconv from "iconv-lite";
import axios from "axios";
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import db from "./index.js";

export async function failEssayCrawlingAPI() {
  let count = 0;
  try {
    for (let i = 1; i <= 10; i++) {

      const url = `https://cafe.naver.com/ArticleList.nhn?search.clubid=14674572&search.menuid=307&search.boardtype=L&search.totalCount=151&search.cafeId=14674572&search.page=${i}`;
      const { data } = await axios.get(url, {
        responseType: "arraybuffer",
        responseEncoding: "binary",
        transformResponse: [data => iconv.decode(data, "EUC-KR")]
      });
      // cheerio를 사용하여 HTML 파싱
      const $ = cheerio.load(data);

      const tr = $("tbody tr");

      // 'a.article' 클래스의 모든 링크를 찾고 href 속성 가져오기
      tr.each(async (index, element) => {

        const articleElement = $(element).find("td.td_article div.board-list div.inner_list a.article");
        const dateElement = $(element).find("td.td_date");
        if (dateElement === 0 || articleElement.length === 0) {
          return;
        }
        const essay_href = "https://m.cafe.naver.com" + $(articleElement).attr("href");
        const essay_title = $(articleElement).text().trim() || "";
        const essay_date = $(dateElement).text() || "";
        console.log(essay_href);
        console.log(essay_title);
        console.log(essay_date);
        console.log("----------");
        // 새 문서 데이터
        const newEssayRef = doc(collection(db, "fail-essay"));
        const newEssayData = {
          essay_id:newEssayRef.id,
          essay_href: essay_href,
          essay_title: essay_title,
          essay_date: essay_date
        };
        // 문서 추가
        await setDoc(newEssayRef, newEssayData);
        count += 1;
      });
    }
  } catch (error) {
    console.error("Error fetching the page:", error);
  }
  return count;
}

export async function getAllFailEssay() {
  const FailEssayRef=collection(db, "fail-essay");
  const FailEssayQuery=query(FailEssayRef,orderBy("essay_date","desc"));
  const EssayQuerySnapshot = await getDocs(FailEssayQuery);
  if (EssayQuerySnapshot.empty){
    return [];
  }
  const allFailList=[];
  EssayQuerySnapshot.forEach((doc) => {
    const aFailEssay={
      essay_href: doc.data()['essay_href'],
      essay_title: doc.data()['essay_title'],
      essay_date: doc.data()['essay_date'],
    }
    allFailList.push(aFailEssay);
  })
  return allFailList;
}
