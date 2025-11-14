import React from "react";

const ResizeHandle = ({ onResizeStart }) => (
  <div onMouseDown={onResizeStart} className="absolute bottom-1 right-1 w-5 h-5 cursor-se-resize bg-transparent">
    <div className="w-3 h-3 border-r-2 border-b-2 border-zinc-500/60 rounded-sm absolute bottom-0 right-0"></div>
  </div>
);

export default ResizeHandle;
