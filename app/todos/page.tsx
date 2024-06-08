import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";

async function getAllTodosApi(){
    const res=await fetch(`${process.env.BASE_URL}/api/todos`,{cache:'no-store'})
    console.log("getAllTodo List")
    return res.json();
}
export default async function TodosPage(){
    const response=await getAllTodosApi();
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
        <TodosTable todos={response.data ?? []}/>
    </div>
  );
}