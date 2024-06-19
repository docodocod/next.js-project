const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

// URL 설정
const url = 'https://cafe.naver.com/ArticleList.nhn?search.clubid=14674572&search.menuid=96&search.boardtype=L';

// 비동기 함수 작성
async function fetchArticleLinks() {
  try {
    // axios를 사용하여 HTML 가져오기
    const { data } = await axios.get(url,{
      responseType: 'arraybuffer',
      reponseEncoding: 'binary',
      transformResponse: [data => iconv.decode(data, 'EUC-KR')]
    });
    // cheerio를 사용하여 HTML 파싱
    const $ = cheerio.load(data);

    // 'a.article' 클래스의 모든 링크를 찾고 href 속성 가져오기
    $('a.article').each((index, element) => {
      const href = $(element).attr('href');
      const title=$(element).text().trim();
      console.log(title);
      console.log("https://cafe.naver.com"+href);
      console.log("------")
    });
  } catch (error) {
    console.error('Error fetching the page:', error);
  }
}

// 함수 호출
fetchArticleLinks();