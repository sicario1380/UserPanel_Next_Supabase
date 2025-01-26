"use client";

import React from "react";
import Div from "@/components/Div";

interface TypeSelectProps {
  type: string;
  setType: (type: string) => void;
}

const TypeSelect: React.FC<TypeSelectProps> = ({ type, setType }) => (
  <Div>
    <label>
      <span>Select your Type</span>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Technical">Technical</option>
        <option value="Tutorials">Tutorials</option>
        <option value="Fee">Fee</option>
      </select>
    </label>
  </Div>
);

export default TypeSelect;
