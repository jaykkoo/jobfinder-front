import InputText from "../components/inputs/InputText";
import Button from "../components/forms/Button";
import { useRef, useState, useEffect } from "react";
import ContractTypesList from "../components/display/ContractTypesList";
import { createOffer, getOfferById, updateOffer, deleteOffer } from "../api/OfferService";
import { useAuth }   from "../api/AuthContext";


export default function CrudOffer({action, offerId="", closeModal}) {
    const titleRef = useRef();
    const zipRef = useRef();
    const cityRef = useRef();
    const salaryRef = useRef();
    const [selectedContractTypes, setSelectedContractTypes] = useState([]);
    const [offer, setOffer] = useState(null);
    const [checkedContractTypes,  setCheckedContractTypes] = useState([]);

    const { accessToken } = useAuth();
    
    const handleCreateOffer = async () => {
        // Collect data from refs
        const offerDataLive = {
            title: titleRef.current.value,
            zip: zipRef.current.value,
            city: cityRef.current.value,
            salary: salaryRef.current.value,
            contract: selectedContractTypes,
        };

        // Call the createOffer function (assuming it exists)
        try {
            await createOffer(offerDataLive, accessToken);
            window.location.reload();
        } catch (error) {
            console.error("Error creating offer:", error);
        }
    };

    const handleUpdateOffer = async () => {   
        // Collect data from refs
        const offerDataLive = {
            title: titleRef.current.value,
            zip: zipRef.current.value,
            city: cityRef.current.value,
            salary: salaryRef.current.value,
            contract: selectedContractTypes,
        };
        // Call the EditOffer function (assuming it exists)
        try {
            await updateOffer(offerDataLive, accessToken, offerId);
            window.location.reload();
        } catch (error) {
            console.error("Error creating offer:", error);
        }
    };

    const handleDeleteOffer = async () => {
        try {
            await deleteOffer(offerId, accessToken);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting offer:", error);
        }
    }

    const getOffer = async () => {
        try {
            const offer = await getOfferById(offerId, accessToken);
            setOffer(offer);
            setCheckedContractTypes(offer.contract.map((contract) => contract.id));
        } catch (error) {
            console.error("Error fetching offer:", error);
        }
    }

    const handleContractTypesChange = (selectedTypes) => {
        setSelectedContractTypes(selectedTypes);
    };

    if (action === "edit") {
        useEffect(() => {
            getOffer();
        }, [offerId]);
    }

    return (
        <div>
            <header className="flex items-center">
                <h3 id="modal-title" className="flex-1 text-lg font-medium">
                    { action === "create" ? "Créer une offre" : "Informations" }
                </h3>
                <button
                    onClick={closeModal}
                    className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-medium transition duration-300 hover:bg-beige"
                    aria-label="Close dialog"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
            </header>
            <div id="content-4a" className="flex-1">
                <div className="flex flex-col gap-6">
                    <div className="relative">
                        <InputText id="title-offer" label="Titre de l'offre" type="text" ref={titleRef}  defaultValue={ offer ? offer.title : ""} />
                    </div>
                    <div className="relative my-6">
                        <InputText id="zip-offer" label="Code postale de la ville" type="text" ref={zipRef}  defaultValue={ offer ? offer.zip : ""} />
                    </div>
                    <div className="relative my-6">
                        <InputText id="city-offer" label="Lieu" type="text" ref={cityRef} defaultValue={ offer ? offer.city : ""} />
                    </div>
                    <div className="relative my-6">
                        <InputText id="salary-offer" label="Salaire" type="text" ref={salaryRef} defaultValue={ offer ? offer.salary : ""} />
                    </div>
                </div>
            </div>
            <ContractTypesList onContractTypesChange={handleContractTypesChange} checkedContractTypes={checkedContractTypes} />
            { action === "create" && 
                <Button
                    classes="mt-4 px-4 py-2 bg-peach text-black rounded-lg"
                    effects="hover:bg-beige"
                    onClick={handleCreateOffer}
                >
                    Créer
                </Button>
            }
            { action === "edit" &&
                <>  
                    <div>
                        <Button
                            classes="mt-4 px-4 py-2 bg-peach text-black rounded-lg"
                            effects="hover:bg-beige"
                            onClick={handleUpdateOffer}
                        >
                            Modifier
                        </Button>
                    </div>
                    <div>
                        <Button
                            classes="mt-4 px-4 py-2 bg-peach text-black rounded-lg"
                            effects="hover:bg-beige"
                            onClick={handleDeleteOffer}
                        >
                            Supprimer
                        </Button>
                    </div>
                </>
            }
        </div>
    );
}
