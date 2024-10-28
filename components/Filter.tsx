import React from "react";

export const Filter = ({ setItems, setContainers, containers }: any) => {
  return (
    <div className="flex gap-2 items-center h-10 px-3">
      {containers.map((item) => (
        <div key={item} className="flex gap-2 items-center">
          <input type="checkbox" defaultChecked={containers.includes(item)} />
          <span className="text-muted-foreground">{item}</span>
        </div>
      ))}
    </div>
  );
};
