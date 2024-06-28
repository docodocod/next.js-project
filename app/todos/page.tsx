import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";
import DailyAdviceTable from "@/components/daily-advice-table";

async function getAllTodosApi(){
    const res=await fetch(`${process.env.BASE_URL}/api/todos`,{cache:'no-store'})
    console.log("getAllTodo List")
    const contentTypeHeaderValue=res.headers.get('Content-Type');
    if(contentTypeHeaderValue?.includes('text/html')){
        return null;
    }
    return res.json();
}
export default async function TodosPage(){
    const response=await getAllTodosApi();
    const fetchedTodos=response?.data ?? [];
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>오늘의 성장</h1>
        <DailyAdviceTable/>
        <TodosTable todos={fetchedTodos}/>
    </div>
  );
}