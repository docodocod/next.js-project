import { title } from "@/components/primitives";
import AdmissionTable from "@/components/admissions-office-table";

async function getAllAdmissionApi() {
  const res = await fetch(`${process.env.BASE_URL}/api/admission`, { cache: "no-store" });
  console.log("getAllAdmission List");
  const contentTypeHeaderValue = res.headers.get("Content-Type");
  if (contentTypeHeaderValue?.includes("text/html")) {
    return null;
  }
  return res.json();
}

export default async function admissionsOfficePage() {
  const response = await getAllAdmissionApi();
  const fetchedAdmissions = response?.data ?? [];
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>대학교 입학처</h1>
      <AdmissionTable admissionList={fetchedAdmissions} />
    </div>
  );
}