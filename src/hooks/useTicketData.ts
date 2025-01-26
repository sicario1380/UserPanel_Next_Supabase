"use client";

import { useState, useEffect, useCallback } from "react";
import { apiService } from "@/services/ticketService";
import { Ticket } from "@/types/ticket";

export const useTicketData = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const { tickets } = await apiService.getTicketsPaginated(1, 10); // Default to page 1, 10 items per page
        setTickets(tickets);
      } catch (error: any) {
        console.error("Error fetching tickets:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const createTicket = useCallback(
    async (
      ticketData: Omit<Ticket, "TicketID" | "DateIssued" | "LastUpdate">
    ) => {
      try {
        const newTicket = await apiService.createTicket(ticketData);
        setTickets((prevTickets) => [...prevTickets, newTicket]);
      } catch (error: any) {
        console.error("Error creating ticket:", error);
        setError(error.message);
      }
    },
    []
  );

  return {
    tickets,
    loading,
    error,
    createTicket,
  };
};
