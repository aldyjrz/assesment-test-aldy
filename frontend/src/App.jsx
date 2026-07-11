import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [form, setForm] = useState({
    name: "",
    id: "",
    flightNumber: "",
    date: "",
    aircraft: "ATR",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [seats, setSeats] = useState([]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetMessage = () => {
    setError("");
    setSuccess("");
    setSeats([]);
  };

  const validate = () => {
    if (!form.name.trim()) return "Crew Name is required.";
    if (!form.id.trim()) return "Crew ID is required.";
    if (!form.flightNumber.trim()) return "Flight Number is required.";
    if (!form.date) return "Flight Date is required.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    resetMessage();

    const validation = validate();

    if (validation) {
      setError(validation);
      return;
    }

    setLoading(true);

    try {
      const check = await axios.post(`${API}/check`, {
        flightNumber: form.flightNumber,
        date: form.date,
      });

      if (check.data.exists) {
        setError(
          "Voucher has already been generated for this flight and date."
        );
        setLoading(false);
        return;
      }

      const generate = await axios.post(`${API}/generate`, form);


      //destrucure json dlu
      const {
          data: {
              data: { seats },
          },
      } = generate;

      setSeats(seats);
      setSuccess("Voucher generated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">

        <div className="bg-blue-600 rounded-t-xl p-6">
          <h1 className="text-3xl text-white font-bold">
             Voucher Seat Assignment
          </h1>

          
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-medium">
                Crew Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-medium">
                Crew ID
              </label>

              <input
                type="text"
                name="id"
                value={form.id}
                onChange={handleChange}
                className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-medium">
                Flight Number
              </label>

              <input
                type="text"
                name="flightNumber"
                placeholder="GA102"
                value={form.flightNumber}
                onChange={handleChange}
                className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-medium">
                Flight Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-medium">
                Aircraft Type
              </label>

              <select
                name="aircraft"
                value={form.aircraft}
                onChange={handleChange}
                className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="ATR">ATR</option>
                <option value="Airbus 320">
                  Airbus 320
                </option>
                <option value="Boeing 737 Max">
                  Boeing 737 Max
                </option>
              </select>
            </div>

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
          >
            {loading
              ? "Generating..."
              : "Generate Vouchers"}
          </button>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-300 text-green-700 rounded-lg p-4">
              {success}
            </div>
          )}

          {seats.length > 0 && (
            <div>

              <h2 className="text-xl text-dark font-bold mb-4">
                Generated Seats
              </h2>

              <div className="grid grid-cols-3 gap-4">

                {seats.map((seat) => (
                  <div
                    key={seat}
                    className="bg-blue-600 text-white rounded-xl p-8 text-center shadow"
                  >
                    <div className="text-3xl font-bold">
                      {seat}
                    </div>
                  </div>
                ))}

              </div>

            </div>
          )}

        </form>

      </div>
    </div>
  );
}