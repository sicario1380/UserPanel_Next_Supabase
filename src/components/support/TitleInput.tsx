"use client";

import React from "react";
import Input from "@/components/Input";
import Div from "@/components/Div";

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => (
  <Div>
    <Input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Ticket Subject"
      label="Set your Subject"
    />
  </Div>
);

export default TitleInput;
