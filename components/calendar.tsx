import React from "react";
import {DatePicker} from "@nextui-org/react";
import { getLocalTimeZone,parseDate,now} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

export default function Calendar(){

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const [value, setValue] = React.useState(parseDate(getFormattedDate()));
  console.log(value);
  let formatter = useDateFormatter({dateStyle: "full"});
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-wrap items-end md:flex-nowrap justify-end mb-6 md:mb-0 gap-4">
          <DatePicker className="max-w-[150px]" value={value} onChange={setValue}/>
        </div>
          <p className="text-default-500 text-sm">
            {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
          </p>
      </div>
    </div>
  )
}