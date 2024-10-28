"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AddItemsModal = ({ setItems, containerId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>(""); // Track the new item input

  const handleAddItem = () => {
    if (!newItem.trim()) return; // Prevent adding empty items

    setItems((prevItems) => ({
      ...prevItems,
      [containerId]: [...prevItems[containerId], newItem],
    }));

    setNewItem(""); // Clear input after adding
    setIsOpen(false); // Close modal after adding
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>Add Tasks</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
          <DialogDescription>
            Enter the task you'd like to add.
          </DialogDescription>
        </DialogHeader>
        <input
          type="text"
          placeholder={`Add new item to Column `}
          className="p-2 border rounded-sm"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)} // Update new item state
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddItem(); // Add task on Enter key press
            }
          }}
        />
        {/* Button to add task */}
        <button
          onClick={handleAddItem} // Add task on button click
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Task
        </button>
      </DialogContent>
    </Dialog>
  );
};
