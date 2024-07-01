/*
"use client";

import {useState} from "react";
import { Textarea } from "@nextui-org/react";
import { kadvice } from "kadvice";

export default function DailyAdviceTable() {
  const [adviceMessage,setAdviceMessage]=useState("");
  const [adviceAuthor,setAdviceAuthor]=useState("");
  const [adviceAuthorProfile,setAdviceAuthorProfile]=useState("");

  const handler=()=>{
    const advice = kadvice.getOneByDaily(); // 비동기로 데이터 가져오기
    setAdviceMessage(advice.message); // 상태 업데이트
    setAdviceAuthor(advice.author);
    setAdviceAuthorProfile(advice.authorProfile);
    console.log(adviceMessage);
    console.log(adviceAuthor);
    console.log(adviceAuthorProfile);
  }
  handler();
  return (
    <Textarea
      isReadOnly
      label="오늘의 명언"
      variant="bordered"
      labelPlacement="outside"
      color="primary"
      defaultValue={`${adviceMessage}\n- ${adviceAuthor} -\n${adviceAuthorProfile}`}
      className="w-full"
      style={{ textAlign: "center", whiteSpace: "pre-line"}}
    />
  );
};*/
"use client";

import {useState} from "react";
import { Textarea } from "@nextui-org/react";
import { kadvice } from "kadvice";

export default function DailyAdviceTable() {
  const advice = kadvice.getOne();

  return (
    <Textarea
      isReadOnly
      label="오늘의 명언"
      variant="bordered"
      labelPlacement="outside"
      color="primary"
      defaultValue={`${advice.message}\n- ${advice.author} -\n${advice.authorProfile}`}
      className="w-full"
      style={{ textAlign: "center", whiteSpace: "pre-line"}}
    />
  );
}
