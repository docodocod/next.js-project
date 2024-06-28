import { NextRequest, NextResponse } from "next/server";
import {getAllAdmission} from "@/data/admissionOfficeData";

export async function GET(request:NextRequest) {
  const Admissions=await getAllAdmission();
  const response={
    message:"모든 입학처 조회",
    data:Admissions
  }
  return NextResponse.json(response, {status: 201});
}