"use client";

import { useState } from "react";

export const useFormState = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Technical");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("Technical");
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    type,
    setType,
    resetForm,
  };
};
