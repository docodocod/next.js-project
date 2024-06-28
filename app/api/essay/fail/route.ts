import {getAllFailEssay} from "@/data/failEssayData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
  const allFailList=await getAllFailEssay();
  const response={
    message:"모든 불합격 수기 불러오기 완료",
    data:allFailList
  }
  return NextResponse.json(response,{status:201});
}