import React, { useState, useEffect, useRef} from 'react';
import { getAllContractTypes } from '../../api/OfferService';
import Checkbox from '../inputs/CheckBox';


export default function ContractTypesList({onContractTypesChange, checkedContractTypes=[], title_list="Type de contrat"}) {
     
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const checkboxRefs = useRef([]);
    const [contractTypes, setContractTypes] = useState([]);

    const handleCheckboxChange = () => {

        const selectedContractTypes = checkboxRefs.current
            .filter(checkbox => checkbox.checked)
            .map(checkbox => (checkbox.id));
        onContractTypesChange(selectedContractTypes);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllContractTypes();
                setContractTypes(data);
            } catch (error) {
                setError(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading contract types...</p>;
    }
    if(error) {
        return <p>Failed to load contract types</p>;
    }
    return (
        <div>
            { title_list && 
                <h3>{title_list}</h3>
            }
            {contractTypes.map((type, index) => (
                <Checkbox
                    key={type.id}
                    id={type.id}
                    ref={el => checkboxRefs.current[index] = el}
                    onChange={handleCheckboxChange}
                    checkedContractTypes={checkedContractTypes}   
                >
                    {type.name}
                </Checkbox>
            ))}
        </div>
    );
}
