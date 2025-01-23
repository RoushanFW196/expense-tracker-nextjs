"use client";
import { useState } from "react";

interface ExpenseDataType {
  amount: number;
  category: string;
  expense_date: string;
  payment_method: string;
  vendor: string;
  desc: string;
}

const ExpenseForm: React.FC = () => {
  const [formData, setFormData] = useState<ExpenseDataType>({
    amount: 0,
    category: "",
    expense_date: new Date().toISOString().slice(0, 16), // Initial date for datetime-local input
    payment_method: "",
    vendor: "",
    desc: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    category: "",
    expense_date: "",
    payment_method: "",
    vendor: "",
    desc: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formErrors = { ...errors };
    let hasError = false;

    // Simple validation checks
    if (!formData.amount || formData.amount <= 0) {
      formErrors.amount = "Amount is required and must be positive.";
      hasError = true;
    }
    if (!formData.category) {
      formErrors.category = "Category is required.";
      hasError = true;
    }
    if (!formData.payment_method) {
      formErrors.payment_method = "Payment method is required.";
      hasError = true;
    }
    if (!formData.vendor) {
      formErrors.vendor = "Vendor is required.";
      hasError = true;
    }
    if (!formData.desc) {
      formErrors.desc = "Description is required.";
      hasError = true;
    }

    if (hasError) {
      setErrors(formErrors); // Show validation errors
    } else {
      // Simulate form submission

      const res = await fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await res.json();

      // Clear form data
      // setFormData({
      //   amount: 0,
      //   category: "",
      //   expense_date: new Date().toISOString().slice(0, 16),
      //   payment_method: "",
      //   vendor: "",
      //   desc: "",
      // });
      // setErrors({
      //   amount: "",
      //   category: "",
      //   expense_date: "",
      //   payment_method: "",
      //   vendor: "",
      //   desc: "",
      // });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Expense Tracker
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Amount Field */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Category Field */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
            <option value="Electricity">Electricity</option>
            <option value="Mobile Recharge">Mobile Recharge</option>
            <option value="Skills up Courses">Skills up Courses</option>
            <option value="EMI">EMI</option>
            <option value="Investment">Investment</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>

        {/* Date Field */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="datetime-local"
            name="date"
            value={formData.expense_date}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.expense_date && (
            <p className="text-red-500 text-xs mt-1">{errors.expense_date}</p>
          )}
        </div>

        {/* Payment Method Field */}
        <div className="mb-4">
          <label
            htmlFor="method"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Method
          </label>
          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Payment Method</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
            <option value="UPI Transfer">UPI Transfer</option>
          </select>
          {errors.payment_method && (
            <p className="text-red-500 text-xs mt-1">{errors.payment_method}</p>
          )}
        </div>

        {/* Vendor Field */}
        <div className="mb-4">
          <label
            htmlFor="vendor"
            className="block text-sm font-medium text-gray-700"
          >
            Vendor
          </label>
          <input
            type="text"
            id="vendor"
            name="vendor"
            value={formData.vendor}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.vendor && (
            <p className="text-red-500 text-xs mt-1">{errors.vendor}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.desc && (
            <p className="text-red-500 text-xs mt-1">{errors.desc}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
