import axios from "axios";
import { Ticket, FollowUpChat } from "@/types/ticket";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiService = {
  getTicketsPaginated: async (
    page: number,
    pageSize: number,
    status?: string,
    search?: string
  ): Promise<{ tickets: Ticket[]; totalCount: number }> => {
    try {
      let url = `${apiBaseUrl}/tickets?page=${page}&pageSize=${pageSize}`;
      if (status) url += `&status=${status}`;
      if (search) url += `&search=${search}`;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching paginated tickets:", error);
      throw new Error("Failed to fetch paginated tickets.");
    }
  },

  createTicket: async (
    ticketData: Omit<Ticket, "TicketID" | "DateIssued" | "LastUpdate">
  ): Promise<Ticket> => {
    try {
      const response = await axios.post(`${apiBaseUrl}/tickets`, ticketData);
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw new Error("Failed to create ticket.");
    }
  },

  getFollowUpChats: async (TicketID: number): Promise<FollowUpChat[]> => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/tickets/${TicketID}/followupchats`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching follow up chats:", error);
      throw new Error("Failed to fetch follow up chats.");
    }
  },

  createFollowUpChat: async (
    chatData: Omit<FollowUpChat, "ChatID" | "DateSent">
  ): Promise<FollowUpChat> => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/followupchats`,
        chatData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating follow up chat:", error);
      throw new Error("Failed to create follow up chat.");
    }
  },
};
