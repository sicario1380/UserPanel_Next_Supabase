import { NextResponse } from "next/server";
import { apiService } from "@/services/ticketService";
import { Ticket } from "@//types/ticket"; // Import your Ticket type

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    if (
      isNaN(page) ||
      page < 1 ||
      isNaN(pageSize) ||
      pageSize < 1 ||
      pageSize > 50
    ) {
      return NextResponse.json(
        { error: "Invalid page or pageSize" },
        { status: 400 }
      );
    }

    const { tickets, totalCount } = await apiService.getTicketsPaginated(
      page,
      pageSize
    );

    return NextResponse.json({ tickets, totalCount });
  } catch (error: any) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const ticketData: Omit<Ticket, "TicketID" | "DateIssued" | "LastUpdate"> =
      await request.json();

    // Server-side validation (important!)
    if (
      !ticketData.TicketType ||
      !ticketData.Subject ||
      !ticketData.Description ||
      !ticketData.Status
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newTicket = await apiService.createTicket(ticketData);
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error: any) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create ticket" },
      { status: 500 }
    );
  }
}
