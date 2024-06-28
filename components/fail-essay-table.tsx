"use client";

import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { Essay } from "@/types";

export default function FailTable({ failList }: {failList:Essay[]}) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  // Calculate the total number of pages
  const pages = useMemo(() => {
    return failList.length ? Math.ceil(failList.length / rowsPerPage) : 0;
  }, [failList.length, rowsPerPage]);

  // Determine the current loading state
  const loadingState = failList.length === 0 ? "loading" : "idle";

  // Function to get data for the current page
  const currentPageData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return failList.slice(startIndex, endIndex);
  }, [page, rowsPerPage, failList]);

  const FailRow = (aFail: Essay, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell>{index}</TableCell>
        <TableCell><a href={aFail.essay_href} target="_blank">{aFail.essay_title}</a></TableCell>
        <TableCell>{aFail.essay_date}</TableCell>
      </TableRow>
    );
  };

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="number" className="text-center">번호</TableColumn>
        <TableColumn key="title" className="text-center">수기 제목</TableColumn>
        <TableColumn key="date" className="text-center">작성 날짜</TableColumn>
      </TableHeader>
      <TableBody
        items={currentPageData}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {currentPageData.map((aFail: Essay, index: number) => (
          FailRow(aFail, (page - 1) * rowsPerPage + index + 1)
        ))}
      </TableBody>
    </Table>
  );
}

