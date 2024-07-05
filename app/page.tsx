import { title } from "@/components/primitives";
import LoginComponent from "@/components/loginComponent";

export default async function Home(){

  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}></h1>
      <LoginComponent/>
    </div>
  );
}