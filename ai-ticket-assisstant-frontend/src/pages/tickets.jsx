import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true); // New state for fetching status
  const [fetchError, setFetchError] = useState(null); // New state for fetch errors

  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    setFetchLoading(true); // Start loading when fetching tickets
    setFetchError(null); // Clear previous errors
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });

      if (!res.ok) {
        // If response is not OK (e.g., 401, 403, 500)
        const errorData = await res.json();
        console.error("HTTP error fetching tickets:", res.status, errorData);
        setFetchError(errorData.message || "Failed to load tickets.");
        setTickets([]); // Ensure tickets array is empty on error
        return; // Stop execution
      }

      const data = await res.json();
      console.log("Fetched tickets data:", data); // Log the raw data to inspect its structure

      // Check if data itself is an array, or if tickets are nested under a 'tickets' property
      if (Array.isArray(data)) {
        setTickets(data); // If the backend returns an array directly
      } else if (data && Array.isArray(data.tickets)) {
        setTickets(data.tickets); // If the backend returns an object with a 'tickets' array
      } else {
        console.warn("Fetched data is not in an expected array format:", data);
        setTickets([]); // Default to empty array if format is unexpected
      }
    } catch (err) {
      console.error("Network or parsing error fetching tickets:", err);
      setFetchError("Failed to connect to the server or parse data.");
      setTickets([]); // Ensure tickets array is empty on error
    } finally {
      setFetchLoading(false); // End loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []); // Empty dependency array means this runs once on component mount

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Loading for form submission
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ title: "", description: "" });
        fetchTickets(); // Refresh list after successful creation
      } else {
        // IMPORTANT: Use a proper modal or message box instead of alert()
        // For demonstration, I'm keeping alert but advise replacing it.
        alert(data.message || "Ticket creation failed");
      }
    } catch (err) {
      // IMPORTANT: Use a proper modal or message box instead of alert()
      alert("Error creating ticket. Check console for details.");
      console.error("Error submitting ticket:", err);
    } finally {
      setLoading(false); // End loading for form submission
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ticket Title"
          className="input input-bordered w-full rounded-md"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Ticket Description"
          className="input input-bordered w-full rounded-md min-h-[100px] py-2"
          required
        ></textarea>
        <button
          className="btn btn-primary w-full rounded-md"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">All Tickets</h2>
      {fetchLoading ? (
        <p className="text-center text-gray-500">Loading tickets...</p>
      ) : fetchError ? (
        <p className="text-center text-red-500">{fetchError}</p>
      ) : (
        <div className="space-y-3">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <Link
                key={ticket._id}
                className="card shadow-md p-4 bg-base-100 block transition duration-200 hover:bg-base-200 rounded-lg"
                to={`/tickets/${ticket._id}`}
              >
                <h3 className="font-bold text-lg text-primary">
                  {ticket.title}
                </h3>
                <p className="text-sm text-gray-700">{ticket.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Created At: {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No tickets submitted yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
