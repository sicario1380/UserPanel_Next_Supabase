import { NextRequest, NextResponse } from "next/server";
import { apiService } from "@/services/ticketService";
import { FollowUpChat } from "@/types/ticket";

// Correctly typed GET handler
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
): Promise<NextResponse> {
  try {
    // Await the params since they are passed as a Promise
    const { ticketId } = await params;

    const ticketIdNumber = parseInt(ticketId, 10);
    if (isNaN(ticketIdNumber)) {
      return NextResponse.json({ error: "Invalid Ticket ID" }, { status: 400 });
    }

    const chats = await apiService.getFollowUpChats(ticketIdNumber);
    return NextResponse.json(chats);
  } catch (error: any) {
    console.error("API GET Chats Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch chats" },
      { status: 500 }
    );
  }
}

// Correctly typed POST handler
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
): Promise<NextResponse> {
  try {
    // Await the params since they are passed as a Promise
    const { ticketId } = await params;

    const ticketIdNumber = parseInt(ticketId, 10);
    if (isNaN(ticketIdNumber)) {
      return NextResponse.json({ error: "Invalid Ticket ID" }, { status: 400 });
    }

    const chatData: Omit<FollowUpChat, "ChatID" | "DateSent"> =
      await request.json();

    if (!chatData.Message || !chatData.Sender) {
      // Basic validation
      return NextResponse.json(
        { error: "Message and Sender are required" },
        { status: 400 }
      );
    }

    const newChat = await apiService.createFollowUpChat({
      ...chatData,
      TicketID: ticketIdNumber,
    });
    return NextResponse.json(newChat, { status: 201 });
  } catch (error: any) {
    console.error("API POST Chats Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create chat" },
      { status: 500 }
    );
  }
}
