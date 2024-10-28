"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "./ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { v4 as uuidv4 } from "uuid"; // To generate unique IDs
import { useState } from "react";

export const AddColumn = ({ tasks, setTasks }: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      title: "",
      tasks: [{ title: "" }], // Default value for tasks
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "tasks", // Always use tasks as the field array name
  });

  const onSubmit = (values) => {
    const { title, tasks } = values;

    const newColumn = {
      title,
      tasks: tasks.map((task) => ({
        ...task,
        id: uuidv4(),
      })),
    };

    setTasks((prev) => [...prev, newColumn]);
    form.reset();
    setOpen(false);
  };

  return (
    <div className="p-4 w-64 h-auto bg-gray-100 border border-gray-300 rounded flex justify-center items-center">
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger className="border p-2 bg-slate-50 rounded-sm">
          Add
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Board</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="Board Title" {...field} />
                )}
              />

              <Separator />

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h5>Sub Tasks</h5>
                  <Button type="button" onClick={() => append({ title: "" })}>
                    Add Task
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    name={`tasks.${index}.title`} // Properly mapping the task title
                    control={form.control}
                    render={({ field }) => (
                      <Input placeholder="Task Title" {...field} />
                    )}
                  />
                ))}
              </div>

              <Button className="self-end" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
