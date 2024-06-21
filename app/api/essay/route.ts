import fetchArticleLinks from "@/data/passingEssayData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
  const Essays=await fetchArticleLinks();
  const response={
    message:"모든 수기 조회",
    data:Essays
  }
  return NextResponse.json(response, {status: 201});
}