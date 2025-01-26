"use client";

import React from "react";
import TextArea from "@/components/TextArea";
import Div from "@/components/Div";

interface DescriptionInputProps {
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  description,
  setDescription,
}) => (
  <Div>
    <TextArea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Ticket Description"
      label="Details"
    />
  </Div>
);

export default DescriptionInput;
