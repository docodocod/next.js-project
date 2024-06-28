"use client";

import React, { useMemo,useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Button,
} from "@nextui-org/react";
import { Essay } from "@/types";
import {HeartIcon} from '@/components/HeartIcon';

export default function PassingTable({ passingList }: {passingList:Essay[]}) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  // Calculate the total number of pages
  const pages = useMemo(() => {
    return passingList.length ? Math.ceil(passingList.length / rowsPerPage) : 0;
  }, [passingList.length, rowsPerPage]);

  // Determine the current loading state
  const loadingState = passingList.length === 0 ? "loading" : "idle";

  // Function to get data for the current page
  const currentPageData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return passingList.slice(startIndex, endIndex);
  }, [page, rowsPerPage, passingList]);

  const PassingRow = (aPassing: Passing, index: number) => {
    const [isSelected,setSelected]=useState("");

    return (
      <TableRow key={aPassing.id}>
        <TableCell>{index}</TableCell>
        <TableCell><a href={aPassing.essay_href} target="_blank">{aPassing.essay_title}</a></TableCell>
        <TableCell>{aPassing.essay_date}</TableCell>
        <TableCell>
          <div className="flex gap-4 items-center">
            <Button isIconOnly color="default" variant="light" aria-label="Like" >
              <HeartIcon />
            </Button>
          </div>
        </TableCell>
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
        <TableColumn key="like" className="text-center">즐겨찾기</TableColumn>
      </TableHeader>
      <TableBody
        items={currentPageData}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {currentPageData.map((aPassing: Essay, index: number) => (
          PassingRow(aPassing, (page - 1) * rowsPerPage + index + 1)
        ))}
      </TableBody>
    </Table>
  );
}

