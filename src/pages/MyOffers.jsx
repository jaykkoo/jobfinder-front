import JobCard from "../components/cards/JobCard"
import CriclePlus from "../assets/iconComponents/CirclePlus";
import CrudOffer from "./CrudOffer";
import { useState, useEffect } from "react";
import { getOfferByUser } from "../api/OfferService";
import { useAuth }   from "../api/AuthContext"
import PaginationBasic from "../components/Pagination"

function MyOffers() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [action, setAction] = useState(null);
  const [offerId, setOfferId] = useState(null);
  const { accessToken } = useAuth();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  
  const fetchData = async (currentPage) => {
      try {
          const data = await getOfferByUser(accessToken, currentPage);
          setOffers(data.offers);
          setTotalPages(data.total_pages);
      } catch (error) {
          setError(true);
          setLoading(false);
      } finally {
          setLoading(false);
      }
  };

  // Effect to fetch offers when page changes
  useEffect(() => {
    fetchData(page);
  }, [page]); // This runs whenever `page` changes


  // Function to go to the next page
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  // Function to go to the previous page
  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  <section>
 
</section>
  return (
    <>
      <div className="flex justify-center items-center px-6 h-16">
        <div className="p-2 rounded-full transition-colors duration-300 ease-in-out hover:bg-beige" onClick={() => { openModal(); setAction("create"); }} >  
          <CriclePlus />
        </div>
      </div>
      <section>
      <div className="container px-6 m-auto">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong</p>
          ) : (
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              {offers.map((offer, index) => (
                <div className="col-span-4 lg:col-span-6" key={index}>
                  <JobCard key={index} for_professional={true} job={offer} setAction={setAction} openModal={openModal} setOfferId={setOfferId}/>
                </div>
              ))}
            </div>
          )}
          { offers.length > 0 && 
          <PaginationBasic 
              nextPage={nextPage} 
              prevPage={prevPage} 
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
        }
        </div>
      </section>
       {/* CreateOffer Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <CrudOffer action={action} offerId={offerId} closeModal={closeModal}/>
          </div>
        </div>
      )}
    </>
  );
}


export default MyOffers