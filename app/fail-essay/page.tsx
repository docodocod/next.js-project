import { title } from "@/components/primitives";
import FailTable from "@/components/fail-essay-table";

async function getAllFailEssayApi(){
    const res=await fetch(`${process.env.BASE_URL}/api/essay/fail`,{cache:'no-store'})
    console.log("getPassingEssay List")
    const contentTypeHeaderValue=res.headers.get('Content-Type');
    if(contentTypeHeaderValue?.includes('text/html')){
        return null;
    }
    return res.json();
}
export default async function FailEssayPage(){
    const response=await getAllFailEssayApi();
    const fetchedFailEssay=response?.data ?? [];
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>편입 불합격 수기</h1>
        <FailTable failList={fetchedFailEssay}/>
    </div>
  );
}