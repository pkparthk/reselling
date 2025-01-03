import { ethers } from "ethers";
import ticketSaleABI from "../utils/TicketSale.json"; // Import the ABI from the new path

// Initialize provider (Make sure you update this with actual RPC URL or network)
const provider = new ethers.JsonRpcProvider(
  "https://polygon-amoy.g.alchemy.com/v2/GjcHVG-enLRguWLlWIiWoMVtZ_yyv93c"
); // Replace with your actual RPC URL

// Contract address - Ensure this is correct for the network you're using
const contractAddress = "0x02587F25618C28bd4dF475E7937aB5758C393Af2"; // Replace with your deployed contract address

// Initialize contract with ABI and provider
const contract = new ethers.Contract(
  contractAddress,
  ticketSaleABI.abi,
  provider
); // Use the ABI from TicketSale.json

// Function to buy a ticket
export const buyTicket = async (ticketId: string) => {
  try {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.buyTicket(ticketId); // Calls the buyTicket method in your contract
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Ticket bought successfully!");
  } catch (error) {
    console.error("Error buying ticket:", error);
  }
};

// Function to sell a ticket
export const sellTicket = async (ticketDetails: any) => {
  try {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.sellTicket(ticketDetails); // Calls the sellTicket method in your contract
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Ticket sold successfully!");
  } catch (error) {
    console.error("Error selling ticket:", error);
  }
};

// Function to fetch tickets for sale
export const getTicketsForSale = async () => {
  try {
    const tickets = await contract.getTicketsForSale(); // Fetches the tickets available for sale
    return tickets;
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
};
