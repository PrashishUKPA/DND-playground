import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AddColumn } from "./AddColumn"; // Make sure this points to your AddColumn component

const initialTasks = [
  {
    title: "Backlog",
    tasks: [
      { id: "5", title: "Research competitor websites" },
      { id: "6", title: "Create user journey maps" },
      { id: "7", title: "Plan marketing strategy" },
    ],
  },
  {
    title: "To Do",
    tasks: [
      { id: "1", title: "Design homepage layout" },
      { id: "2", title: "Fix login issue" },
      { id: "8", title: "Develop responsive navigation" },
      { id: "9", title: "Integrate payment gateway" },
    ],
  },
  // Add more columns as needed...
];
const Column = ({ column }) => {
  const { setNodeRef } = useDroppable({ id: column.title });
  return (
    <div
      ref={setNodeRef}
      className="p-4 w-64 h-auto bg-gray-100 border border-gray-300 rounded"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-bold mb-4">{column.title}</h2>
        <p>{column.tasks.length}</p>
      </div>
      <SortableContext
        items={column.tasks.map((task) => task.id)} // Use task IDs here
        strategy={verticalListSortingStrategy} // Specify the sorting strategy
      >
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

const Task = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  console.log("transform", transform);
  console.log("isDragging", isDragging);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-2 my-2 bg-white shadow rounded-md border border-gray-200 relative flex flex-row gap-2"
    >
      <button
        className="size-6 bg-slate-100 flex items-center justify-center p-1 border rounded-sm"
        {...listeners}
        {...attributes}
      >
        ::
      </button>
      <p className="flex-grow">{task.title}</p>
    </div>
  );
};

const Board = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const sourceColumnIndex = tasks.findIndex((col) =>
        col.tasks.find((task) => task.id === active.id)
      );
      const destinationColumnIndex = tasks.findIndex(
        (col) => col.title === over.id
      );

      if (sourceColumnIndex !== destinationColumnIndex) {
        setTasks((prev) => {
          const sourceTasks = prev[sourceColumnIndex].tasks.filter(
            (task) => task.id !== active.id
          );
          const activeTask = prev[sourceColumnIndex].tasks.find(
            (task) => task.id === active.id
          );

          return prev.map((column, index) => {
            if (index === sourceColumnIndex) {
              return { ...column, tasks: sourceTasks };
            }
            if (index === destinationColumnIndex) {
              return {
                ...column,
                tasks: [...column.tasks, activeTask],
              };
            }
            return column;
          });
        });
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 ">
        <SortableContext
          items={Object.keys(tasks)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((column) => {
            console.log("column", column);
            return <Column key={column.title} column={column} />;
          })}
        </SortableContext>
        {/* <DragOverlay></DragOverlay> */}
        <AddColumn tasks={tasks} setTasks={setTasks} />
      </div>
    </DndContext>
  );
};

export default Board;
