"use client";
import { useNavbarState } from "@/hooks/useNavbarState";
import CreateTicketForm from "@/components/support/CreateTicketForm";

export default function CreateTicketPage() {
  const { selectedItem } = useNavbarState();

  return (
    <div>
      <h1>Create Ticket</h1>
      {selectedItem === "Support" && <p>You are in the support section.</p>}
      <CreateTicketForm />
    </div>
  );
}
