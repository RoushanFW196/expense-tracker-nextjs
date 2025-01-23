import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true }, // Should be String for dropdown values
  expense_date: { type: Date, required: true },
  payment_method: { type: String, required: true }, // Should be String for dropdown values
  vendor: { type: String, required: true },
  desc: { type: String, required: false }, // Optional description
});

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema);
