"use client";

import { Textarea } from "@nextui-org/react";
import { kadvice } from "kadvice";

export default function DailyAdviceTable() {
  const advice = kadvice.getOneByDaily();
  return (
    <Textarea
      isReadOnly
      label="오늘의 명언"
      variant="bordered"
      labelPlacement="outside"
      placeholder="Enter your description"
      defaultValue={`${advice.message}\n- ${advice.author} -\n${advice.authorProfile}`}
      className="w-full"
      style={{ textAlign: "center", whiteSpace: "pre-line" }}
    />
  );
}
