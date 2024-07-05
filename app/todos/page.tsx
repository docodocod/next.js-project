import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";
import DailyAdviceTable from "@/components/daily-advice-table";
import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/util/authOptions";
import {Session} from "@/types"

async function getAllTodosApi(email: string | null | undefined){
    const res=await fetch(`${process.env.BASE_URL}/api/todos/${email}`,{cache:'no-store'});
    console.log("getAllTodo List")
    const contentTypeHeaderValue=res.headers.get('Content-Type');
    if(contentTypeHeaderValue?.includes('text/html')){
        return null;
    }
    return res.json();
}
export default async function TodosPage() {
  //세션 불러오기
  const session:Session | null = await getServerSession(authOptions)
  if (!session) {
    console.log('세션이 없습니다.');
  }
  const userId:string | null | undefined = session?.user?.data?.email;
  console.log("session:" + userId);
  const response = await getAllTodosApi(userId);
  const fetchedTodos = response?.data ?? [];

  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>오늘의 성장</h1>
      <DailyAdviceTable />
      <TodosTable todos={fetchedTodos} userId={userId} />
    </div>
  );
}