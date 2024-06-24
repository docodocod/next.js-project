import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";

async function getAllPassingEssayApi(){
    const res=await fetch(`${process.env.BASE_URL}/api/essay`,{cache:'no-store'})
    console.log("getPassingEssay List")
    const contentTypeHeaderValue=res.headers.get('Content-Type');
    if(contentTypeHeaderValue?.includes('text/html')){
        return null;
    }
    return res.json();
}
export default async function PassingEssayPage(){
    const response=await getAllPassingEssayApi();
    const fetchedPassingEssay=response?.data ?? [];
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>Passing-Essay</h1>
        <PassingTable passingList={fetchedPassingEssay}/>
    </div>
  );
}