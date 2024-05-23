export const transactions = [];
export const transactionsContainer = document.querySelector("#transactions");
export class Transaction {
    constructor(transactionId, date, orderDetails, grandTotal) {
      this.transactionId = transactionId;
      this.date = date;
      this.orderDetails = orderDetails;
      this.grandTotal = grandTotal;
    }

    displayTransaction() {
      const transactionDiv = document.createElement("div");
      transactionDiv.className = "mb-4 p-2 border border-gray-300 rounded";
      transactionDiv.innerHTML = `
            <h4 class="font-bold">Transaction ID: ${this.transactionId}</h4>
            <p>Date: ${this.date}</p>
            <ul class="list-disc pl-5">
              ${this.orderDetails
                .map(
                  (item) => `
                <li>${item.name} - ${item.quantity} x $${item.unitPrice} = $${item.totalPrice}</li>
              `
                )
                .join("")}
            </ul>
            <p class="font-bold">Grand Total: $${this.grandTotal}</p>
          `;
      const editButton = document.createElement("button");
      editButton.textContent = "Edit Transaction";
      editButton.className =
        "px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-700 cursor-pointer";
      editButton.addEventListener("click", () =>
        this.editTransaction(this.transactionId)
      );
      transactionDiv.appendChild(editButton);
      transactionsContainer.appendChild(transactionDiv);
    }

    editTransaction(transactionId) {
      const transaction = transactions.find(
        (t) => t.transactionId === transactionId
      );
      if (!transaction) {
        alert("Transaction not found.");
        return;
      }

      const promptMessage = `Edit quantities for Transaction ID ${transactionId}. Enter changes in the format: "ProductName, NewQuantity; ProductName, NewQuantity;"\nExample: Product A, 2; Product B, 5;`;
      const userInput = prompt(
        promptMessage,
        transaction.orderDetails
          .map((item) => `${item.name}, ${item.quantity};`)
          .join(" ")
      );

      if (!userInput) return;

      try {
        const entries = userInput
          .split(";")
          .map((e) => e.trim())
          .filter((e) => e.length > 0);
        const updatedDetails = entries.map((entry) => {
          const parts = entry.split(",").map((p) => p.trim());
          if (parts.length !== 2 || isNaN(parseInt(parts[1]))) {
            throw new Error("Invalid entry format");
          }
          return { name: parts[0], quantity: Math.max(1, parseInt(parts[1])) };
        });

        transaction.orderDetails.forEach((item) => {
          const updatedItem = updatedDetails.find((u) => u.name === item.name);
          if (updatedItem && updatedItem.quantity >= 0) {
            item.quantity = updatedItem.quantity;
          }
        });
        transaction.grandTotal = transaction.orderDetails.reduce(
          (acc, item) => acc + item.unitPrice * item.quantity,
          0
        );
        displayTransactions();
      } catch (error) {
        alert(
          `Error: ${error.message}. Please try again with the correct format.`
        );
      }
    }
}