import React from "react"

export default function JobCard({job={}, for_professional=false, setAction, openModal, setOfferId}) {
    return (
        <>
        {/*<!-- Component: Basic card --> */}
        <div className="overflow-hidden rounded-lg m-4 border-2 lg:border-4 border-peach bg-beige">
            <div className="p-6">
                <h3 className="mb-4 text-xl font-medium w-full">
                    {job.title}
                </h3>
                <div>
                    <p>Salaire: {job.salary}</p>
                    <p>Contrat: {job.contract.map(contract => contract.name).join(", ")}</p>
                    <p>Lieu: {job.city} {job.zip}</p>
                </div>
                <div className="mt-2">
                    <button 
                        className="bg-peach px-4 py-2 rounded-md hover:bg-blue"  
                        onClick={
                            for_professional 
                            ? () => {
                                setAction("edit"); 
                                openModal();
                                setOfferId(job.id);                             
                            }    
                            : undefined
                        }
                    >    
                        {for_professional ? "Modifier" : "Postuler"}
                    </button>
                </div>
            </div>
        </div>
        {/*<!-- End Basic card --> */}
        </>
    )
}
