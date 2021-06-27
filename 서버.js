const 익스프레스 = require("express"),
  _ = require("lodash"),
  코어스 = require("cors"),
  바디파서 = require("body-parser"),
  블록체인 = require("./블록체인"),
  당신과나 = require("./당신과나");
 
const {
    블록체인가져오기,
    블록자동채굴, 
} = 블록체인;
const { 당신과나서버시작, 당신들과연결 } = 당신과나;


//리눅스 : export http_port=4000
//윈도우즈 : set http_port=4000
const 포트 = process.env.http_port || 3000;
const 앱 = 익스프레스();
앱.use(바디파서.json());
앱.use(코어스());

앱
  .route("/blocks")
  .get((요청, 응답) => {
    응답.send(블록체인가져오기());
  })
  .post((요청, 응답) => {
    const 새로운블록 = 블록자동채굴();
    응답.send(새로운블록);
  });

앱.post("/peers", (요청, 응답) => {
      const { body: { peer } } = 요청;
      당신들과연결(peer);
      응답.send();
});

const 서버 = 앱.listen(포트, () =>
  console.log(`한국코인 서버 실행 - 포트 : ${포트} ✅`)
);
//TODO : 지갑
// 지갑초기화();
당신과나서버시작(서버);

    