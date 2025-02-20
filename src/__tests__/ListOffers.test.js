import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListOffer from "../pages/ListOffer";
import { searchOffers } from "../api/OfferService";
import InputSearch from "../components/inputs/InputSearch";

// Mock API function
jest.mock("../api/OfferService", () => ({
  searchOffers: jest.fn(),
}));

describe("ListOffer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  console.log(searchOffers.mock.calls, "@@@@@@@@");

  test('searchOffers is mocked', () => {
      // Check if searchOffers is a mock function
      expect(searchOffers).toBeDefined(); // Should not be undefined
      expect(jest.isMockFunction(searchOffers)).toBe(true); // Should be a mock function
  });

  test("should not trigger search if no input is provided", () => {
    const { getByText } = render(<ListOffer />);
    
    const searchButton = getByText("Chercher");
    
    // Click the search button without filling anything
    fireEvent.click(searchButton);
  
    // Make sure searchOffers is not called
    expect(searchOffers).not.toHaveBeenCalled();
  });
  
  test("should trigger search if title is provided", async () => {
    // Setup the mock to return some data
    searchOffers.mockResolvedValueOnce({
      total_pages: 1,
      offers: [{
        id: 1,
        title: "Software Engineer",
        salary: "43000",
        city: "Paris",
        contract: [{'id': 1, 'name': 'CDI'}],
        zip: "75000",
      }],
    });
  
    // Render the ListOffer component
    render(<ListOffer />);
    
    // Get the button and input field
    const searchButton = screen.getByText("Chercher");
    const titleInput = screen.getByPlaceholderText("Search here");
  
    // Fill in the title
    fireEvent.change(titleInput, { target: { value: "Software Engineer" } });
    // Click the search button
    fireEvent.click(searchButton);
  
    // Ensure the search function was called once
    await waitFor(() => {
      expect(searchOffers).toHaveBeenCalledTimes(1);
      expect(searchOffers).toHaveBeenCalledWith(expect.objectContaining({
        title: "Software Engineer",
        contract: [],
        city: "",
        zip: "",
      }), 1); // Check if currentPage is passed correctly
  
      // Check if the job title "Software Engineer" is displayed
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  
      // Check if the salary, city, and other details are displayed
      expect(screen.getByText("Salaire: 43000")).toBeInTheDocument();
      expect(screen.getByText("Contrat: CDI")).toBeInTheDocument();
      expect(screen.getByText("Lieu: Paris 75000")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    });
  });

  


  // test("displays pagination and navigates pages", async () => {
  //   searchOffers.mockResolvedValue({
  //     total_pages: 2,
  //     offers: [{ id: 1, title: "Software Engineer" }],
  //   });

  //   render(<ListOffer />);

  //   const searchButton = screen.getByText("Chercher");
  //   fireEvent.click(searchButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  //   });

  //   const nextPageButton = screen.getByText("Next"); // Adjust according to your Pagination component
  //   fireEvent.click(nextPageButton);

  //   await waitFor(() => {
  //     expect(searchOffers).toHaveBeenCalledWith(expect.any(Object), 2);
  //   });
  // });

  // test("shows no results message when search returns empty", async () => {
  //   searchOffers.mockResolvedValueOnce({ total_pages: 0, offers: [] });

  //   render(<ListOffer />);

  //   fireEvent.click(screen.getByText("Chercher"));

  //   await waitFor(() => {
  //     expect(screen.getByText("Aucun résultat trouvé")).toBeInTheDocument();
  //   });
  // });
});
