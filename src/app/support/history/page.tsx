"use client";
import { useState, useEffect } from "react";
import { apiService } from "@/services/ticketService";
import { Ticket } from "@/types/ticket";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const TicketHistory: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const { tickets, totalCount } = await apiService.getTicketsPaginated(
          currentPage,
          pageSize,
          filterStatus === "All" ? undefined : filterStatus,
          searchQuery
        );
        setTickets(tickets);
        setTotalCount(totalCount);
      } catch (err: any) {
        console.error("Error fetching tickets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [currentPage, pageSize, filterStatus, searchQuery]);

  useEffect(() => {
    const page = searchParams.get("page");
    const size = searchParams.get("pageSize");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    if (page) setCurrentPage(Number(page));
    if (size) setPageSize(Number(size));
    if (status) setFilterStatus(status);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const updateQueryParams = (params: { [key: string]: any }) => {
    const url = new URL(window.location.href);

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        url.searchParams.set(key, params[key]);
      } else {
        url.searchParams.delete(key);
      }
    });

    router.push(url.toString());
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateQueryParams({
      page: newPage,
      pageSize,
      status: filterStatus,
      search: searchQuery,
    });
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
    updateQueryParams({
      page: 1,
      pageSize: event.target.value,
      status: filterStatus,
      search: searchQuery,
    });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
    updateQueryParams({
      page: 1,
      pageSize,
      status: event.target.value,
      search: searchQuery,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    updateQueryParams({
      page: 1,
      pageSize,
      status: filterStatus,
      search: event.target.value,
    });
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ticket-history-container">
      <h1>Ticket History</h1>

      <div className="filter-search-container">
        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Awaiting">Awaiting</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          type="text"
          placeholder="Search by subject"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Last Update</th>
            <th>Status</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Ticket ID</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.TicketID}>
              <td>{new Date(ticket.LastUpdate).toLocaleString()}</td>
              <td className={ticket.Status.toLowerCase()}>{ticket.Status}</td>
              <td>{ticket.Subject}</td>
              <td>{new Date(ticket.DateIssued).toLocaleDateString()}</td>
              <td>{ticket.TicketID}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {generatePageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? "active-page" : ""}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TicketHistory;
