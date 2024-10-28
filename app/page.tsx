"use client";
import Board from "@/components/Board";
import { BasicSetup } from "@/components/MultipleDND";
import React, { useState } from "react";

const Page = () => {
  const [data, setData] = useState();

  return (
    <div>
      {/* <Board /> */}
      <BasicSetup />
    </div>
  );
};

export default Page;
