"use client";

import React from "react";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import TitleInput from "@/components/support/TitleInput";
import DescriptionInput from "@/components/support/DescriptionInput";
import TypeSelect from "@/components/support/TypeSelect";
import { useFormState } from "@/hooks/useFormState";
import { useTicketData } from "@/hooks/useTicketData";
import Div from "@/components/Div";
import "@/styles/ticket.css";
import "@/styles/globals.css";

const CreateTicketForm: React.FC = () => {
  const { createTicket } = useTicketData();
  const {
    title,
    setTitle,
    description,
    setDescription,
    type,
    setType,
    resetForm,
  } = useFormState();

  const handleSubmit = async () => {
    await createTicket({
      Subject: title,
      Description: description,
      TicketType: type,
      Status: "open",
    });
    resetForm();
    alert("Ticket Created Successfully!");
  };

  return (
    <Container className="create-ticket-form">
      <Div>
        <Input type="file" label="Upload" />
      </Div>
      <TitleInput title={title} setTitle={setTitle} />
      <TypeSelect type={type} setType={setType} />
      <DescriptionInput
        description={description}
        setDescription={setDescription}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Container>
  );
};

export default CreateTicketForm;
