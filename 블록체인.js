const 암호화 = require("crypto-js"),
헥스를바이너리로 = require("hex-to-binary");


class 블록 {
        constructor(인덱스, 해시, 이전해시, 시간, 데이터, 난이도, 논스) {
          this.인덱스 = 인덱스;
          this.해시 = 해시; // 이 값을 제외한 모든 값을 직렬화한 뒤 SHA256
          this.이전해시 = 이전해시;
          this.시간 = 시간;
          this.데이터 = 데이터; // TX
          this.난이도 = 난이도;
          this.논스 = 논스;
        }
      }
const 시간가져오기 = () => Math.round(new Date().getTime() / 1000);
const 해시만들기 = (인덱스, 이전해시, 시간, 데이터, 난이도, 논스) =>
    암호화.SHA256(
    인덱스 + 이전해시 + 시간 + JSON.stringify(데이터) + 난이도 + 논스
    ).toString();

var 시간 = 시간가져오기()
console.log(시간)
console.log(해시만들기(0, "", 시간, "", 0, 0))


 const 제네시스블록 = new 블록(
        0, //인덱스
        "0b0c3f656eab403d113514e8dcceee38146157764081766be9d602dd03807ad2", //hash
        "", //이전해시
        1624815700, //시간
        "", //제네시스거래들
        0, //난이도
        0 //논스
      );

// 블록체인 선언 blockchain
let 블록체인 = [제네시스블록]; 
//가장 최신 블록 
const 최신블록가져오기 = () =>블록체인[블록체인.length - 1];

//블록 체인 전체
const 블록체인가져오기 = () => 블록체인;
const 블록이올바른지 = (후보블록, 마지막블록) => {
            //TODO : 
            //  블록 내부 구조 확인 (index는 숫자, hash는 문자열 등등)
            //  추가 하려는 블록 index 가 이전 index + 1 이 맞는지 확인
            //  previousHash 값이 실제 이전 블록의 해시 값과 맞는지 확인
            //  현재 블록의 Hash 값이 맞는지 확인
            //  timestamp가 가 현재 시각/이전 블록과 1분 이내 차이 인지 확인
            return true;
};
const 블록을체인에더하라 = 후보블록 => {
  if (블록이올바른지(후보블록, 최신블록가져오기())) {
      //TODO : Tx 관련 작업
      블록체인.push(후보블록);
      return true;
  } 
};
const 새로운난이도계산 = (최신블록, 블록체인) => {
        //TODO : 새로운 난이도 계산
        return 0;
};
const 난이도찾기 = () => {
    //TODO :  난이도 리턴 (새로운  난이도로 계산 할지, 기존 것 쓸 지)
    return 
};
const 해시가난이도와일치하는지 = (해시, 난이도 = 0) => {
    //TODO : 해시가  난이도가 맞는지 확인하기
    return true;
};

const 난이도가일치하는지 = (해시, 난이도 = 0) => {
  const 바이너리의해시 = 헥스를바이너리로(해시);
  const 필요한0 = "0".repeat(난이도);
  console.log("난이도 :", 난이도, " 해시 : ", 바이너리의해시);
  return 바이너리의해시.startsWith(필요한0);
};

const 블록캐기 = (인덱스, 이전해시, 시간, 데이터, 난이도) => {
  let 논스 = 0;
  while (true) {
    //console.log("Current nonce", nonce);
    const 해시 = 해시만들기(
      인덱스,
      이전해시,
      시간,
      데이터,
      난이도,
      논스
    );
    if (난이도가일치하는지(해시, 난이도)) {
      return new 블록(
        인덱스,
        해시,
        이전해시,
        시간,
        데이터,
        난이도,
        논스
      );
    }
    논스++;
  }
};


블록캐기(1, "0b0c3f656eab403d113514e8dcceee38146157764081766be9d602dd03807ad2", 시간가져오기(), "", 4);

////////////// 올바른지 확인 //////////

const 블록들해시가져오기 = 블록 =>
해시만들기(
  블록.인덱스,
  블록.이전해시,
  블록.시간,
  블록.데이터,
  블록.난이도,
  블록.논스
);

const 블록구조가올바른지 = 블록 => {
    return (
      typeof 블록.인덱스 === "number" &&
      typeof 블록.해시 === "string" &&
      typeof 블록.이전해시 === "string" &&
      typeof 블록.시간 === "number" &&
      typeof 블록.데이터 === "object"
    );
  };

const 시간이올바른지 = (새로운블록, 이전블록) => {
      return (
        이전블록.시간 - 60 < 새로운블록.시간 &&
        새로운블록.시간 - 60 < 시간가져오기()
      );
    };

  const 체인이올바른지 = 후보체인 => {
      const 제네시스가올바른지 = 블록 => {
        return JSON.stringify(블록) === JSON.stringify(제네시스블록); };
      if (!제네시스가올바른지(후보체인[0])) {
        console.log("제네시스 블록이 다름.");
        return null;}
  }

  const 블록이올바른지 = (후보블록, 최신블록) => {
        if (!블록구조가올바른지(후보블록)) {
          console.log("후보 블록의 구조가 이상합니다.");
          return false;
        } else if (최신블록.인덱스 + 1 !== 후보블록.인덱스) {
          console.log("후보 블록의 인덱스가 이상합니다.");
          return false;
        } else if (최신블록.해시 !== 후보블록.이전해시) {
          console.log("후보 블록의 이전 해시값이 실제 최근 블록의 해시값과 다릅니다.");
          return false;
        } else if (블록들해시가져오기(후보블록) !== 후보블록.해시) {
          console.log("후보 블록의 다이제스트와 해시 계산값이 다릅니다.");
          return false;
        } else if (!시간이올바른지(후보블록, 최신블록)) {
          console.log("후보 블록의 시간이 올바르지 않습니다.");
          return false;
        }
        return true;
      };
    