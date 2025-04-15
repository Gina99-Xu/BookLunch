'use client'

import { useState } from "react";

export default function TextExpander({ children }) {

  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded ? children :
    children.split(" ").slice(0, 30).join(" ") + "..."

  return (
    <span>
      {displayText}{" "}
      <button className="text-black font-bold"
        onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  )

}