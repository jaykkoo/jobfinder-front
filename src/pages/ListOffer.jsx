import React from "react";
import { useState, useRef, useEffect } from "react"
import InputSearch from "../components/inputs/InputSearch"
import DropdownBasic from "../components/DropDown"
import InputCityWithAPI from "../components/inputs/InputCityWithAPI"
import Button from "../components/forms/Button"
import { searchOffers } from "../api/OfferService"
import JobCard from "../components/cards/JobCard"
import PaginationBasic from "../components/Pagination"


function ListOffer() {
  const searchRef = useRef();
  const placeRef = useRef();
  const [selectedContractTypes, setSelectedContractTypes] = useState([]);
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searching, setSearching] = useState(false);

  const handleContractTypesChange = (selectedTypes) => {
    setSelectedContractTypes(selectedTypes);
  };
 // Function to fetch offers based on the page
  const fetchOffers = async (currentPage=1) => {

    let dataSearch = {
      title: searchRef.current?.value || "",
      contract: selectedContractTypes,
      city: placeRef.current?.value?.split(" - ")[0] || "",
      zip: placeRef.current?.value?.split(" - ")[1] || "",
    };
    console.log(dataSearch);
    // Prevent empty search calls
    if (!dataSearch.title && !dataSearch.city && !dataSearch.zip && selectedContractTypes.length === 0) {
      console.log("Empty search");
      return;
    }
    console.log("contine")
    try {
      const response = await searchOffers(dataSearch, currentPage);
      setTotalPages(response.total_pages);
      setOffers(response.offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
    setSearching(true);
  };

  // Effect to fetch offers when page changes
  useEffect(() => {
    fetchOffers(page);
  }, [page]); // This runs whenever `page` changes

  // Function to go to the next page
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  // Function to go to the previous page
  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };


  return (
    <>
      <section>
        <div className="px-6 m-auto">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-3">
                <InputSearch ref={searchRef}/>
            </div>
            <div className="col-span-3">
              <DropdownBasic handleContractTypesChange={handleContractTypesChange}/>
            </div>
            <div className="col-span-3">
              <InputCityWithAPI ref={placeRef}/>
            </div>
            <div className="col-span-3">
            <Button
                classes="mt-4 px-4 py-2 bg-peach text-black rounded-lg"
                effects="hover:bg-beige"
                onClick={ () => {
                  fetchOffers(1)
                }}
              >
                Chercher
              </Button>
            </div>
          </div>
          <section>
            <div className="container px-6 m-auto">
              <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                {/* list offer from result with pagination and call <JobCard /> */}
                {offers.length > 0 && (
                  offers.map((offer, index) => (
                    <div className="col-span-4 lg:col-span-6" key={index}>
                      <JobCard key={index} job={offer}  />
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-center items-center">
                {searching && offers.length === 0 &&  (<p>Aucun résultat trouvé</p>)}
                {!searching && (<p>Chercher des offres</p>)}
              </div>
              { offers.length > 0 && 
                < PaginationBasic 
                    nextPage={nextPage} 
                    prevPage={prevPage} 
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                  />
              }
            </div>
          </section>
        </div>
      </section>
    </>
          
  )
}

export default ListOffer
