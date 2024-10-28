"use client";
import { DndContext } from "@dnd-kit/core";
import React from "react";

const DNDContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return <DndContext>{children}</DndContext>;
};

export default DNDContextWrapper;
