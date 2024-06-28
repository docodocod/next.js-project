import { title } from "@/components/primitives";
import PassingTable from "@/components/passing-essay-table";

async function getAllPassingEssayApi(){
    const res=await fetch(`${process.env.BASE_URL}/api/essay/passing`,{cache:'no-store'})
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
      <h1 className={title()}>편입 합격 수기</h1>
        <PassingTable passingList={fetchedPassingEssay}/>
    </div>
  );
}