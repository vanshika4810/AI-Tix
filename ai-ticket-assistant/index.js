import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { serve } from "inngest/express";
import userRoutes from "./routes/user";
import ticketRoutes from "./routes/ticket";
import { inngest } from "./inngest/client";
import { onUserSignup } from "./inngest/functions/on-signup";
import { onTicketCreated } from "./inngest/functions/on-ticket-create";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onUserSignup, onTicketCreated],
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server at http://localhost:3000"));
  })
  .catch((err) => console.error("MongoDB error:", err));
