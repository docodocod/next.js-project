import { title } from "@/components/primitives";

import MyProfileTable from "@/components/profile-table";

export default async function MyProfilePage(){
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>나의 프로필</h1>
        <MyProfileTable/>
    </div>
  );
}