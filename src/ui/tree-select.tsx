"use client";

import { useState } from "react";

type Node = {
  id: string;
  label: string;
  children?: Node[];
};

interface TreeSelectProps {
  data: Node[];
  values: string[];
  onChange: (val: string[]) => void;
}

export function TreeSelect({ data, values, onChange }: TreeSelectProps) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const collectIds = (node: Node): string[] => {
    let ids = [node.id];
    node.children?.forEach((child) => {
      ids = ids.concat(collectIds(child));
    });
    return ids;
  };

  const toggleCheck = (node: Node) => {
    const ids = collectIds(node);
    const isSelected = ids.every((id) => values.includes(id));

    let newValues: string[];

    if (isSelected) {
      newValues = values.filter((v) => !ids.includes(v));
    } else {
      newValues = Array.from(new Set([...values, ...ids]));
    }

    onChange(newValues);
  };

  const getCheckState = (node: Node) => {
    const ids = collectIds(node);
    const checkedCount = ids.filter((id) => values.includes(id)).length;

    if (checkedCount === 0) return "none";
    if (checkedCount === ids.length) return "all";
    return "partial";
  };

  const renderNode = (node: Node, level = 0) => {
    const isExpanded = expanded.includes(node.id);
    const state = getCheckState(node);

    return (
      <div key={node.id}>
        <div
          className="flex items-center gap-2 py-1 hover:bg-muted rounded cursor-pointer"
          style={{ paddingLeft: `${level * 20}px` }} // ✅ FIXED spacing
        >
          {/* ICON SPACE (always reserved) */}
          <div
            className="w-4 flex justify-center"
            onClick={() => node.children && toggleExpand(node.id)}
          >
            {node.children ? (isExpanded ? "▼" : "▶") : ""}
          </div>

          {/* CHECKBOX */}
          <input
            type="checkbox"
            checked={state === "all"}
            ref={(el) => {
              if (el) el.indeterminate = state === "partial";
            }}
            onChange={() => toggleCheck(node)}
          />

          {/* LABEL */}
          <span>{node.label}</span>
        </div>

        {/* CHILDREN */}
        {isExpanded &&
          node.children?.map((child) => renderNode(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="border rounded-md p-2 max-h-64 overflow-y-auto bg-white">
      {data.map((node) => renderNode(node, 0))}
    </div>
  );
}
