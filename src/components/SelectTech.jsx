import React from "react";
import {Select, SelectItem, Chip} from "@nextui-org/react";
import {technology} from "../data/Data";
import styles from "../app/jobsList/page.module.css"

export default function SelectTech() {
  return (
    <Select
      items={technology}
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="designation,skill,etc..."
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-unit-12 py-2",
      }}
      style={{ minHeight: '3.4rem' }} 
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.data.name}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
