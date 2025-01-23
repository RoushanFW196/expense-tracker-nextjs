import { NextResponse } from "next/server";
import Expense from "../../../models/expense";

export async function POST(req) {
  try {
    const expense = await req.json();

    const newExpense = new Expense(expense);
    await newExpense.save();
    return NextResponse.json(
      { message: "Expense Saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during adding new expense:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
