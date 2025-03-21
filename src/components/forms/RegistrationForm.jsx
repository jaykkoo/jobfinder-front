import React, { useState } from 'react';
import CheckBox from '../inputs/CheckBox';
import InputText from '../inputs/InputText';
import Button from './Button';
import {createUser} from '../../api/UserService';
 // Replace with your API URL

const RegistrationForm = ({openModalLoginAgain}) => {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isProfessional, setIsProfessional] = useState(false);
    const [isParticular, setIsParticular] = useState(false);

    // Function to handle form submission
    const handleCreateUser = async () => {
        // Validate form fields
        if (!email || !username || !password) {
            alert('Please fill in all required fields.');
            return;
        }

        if (isProfessional && isParticular) {
            alert('Please select only one role: Professional or Particular.');
            return;
        }

        // Prepare user data object
        const userData = {
            email,
            username,
            password,
            profile: {
                "is_professional": isProfessional,
                "is_particular": isParticular ,
            }
        };
        // Call the createUser function
        try {
            await createUser(userData);
            window.location.reload();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div id="content-4a" className="flex-1">
            <div className="flex flex-col gap-6">
                {/* Email Input */}
                <div className="relative">
                    <InputText
                        id="input-register-email"
                        label="Votre email"
                        help="Tapez votre email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Username Input */}
                <div className="relative">
                    <InputText
                        id="input-register-username"
                        label="Votre nom d'utilisateur"
                        help="Tapez votre nom d'utilisateur"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="relative">
                    <InputText
                        id="input-register-pwd"
                        label="Votre mot de passe"
                        help="Tapez votre mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Checkboxes */}
                <div>
                    <CheckBox
                        id="checkbox-professional"
                        checked={isProfessional}
                        onChange={(e) => setIsProfessional(e.target.checked)}
                    >
                        Professionel
                    </CheckBox>
                    <CheckBox
                        id="checkbox-particular"
                        checked={isParticular}
                        onChange={(e) => setIsParticular(e.target.checked)}
                    >
                        Particulier
                    </CheckBox>
                </div>
            </div>

            {/* Modal Actions */}
            <p className="flex justify-center gap-2 underline cursor-pointer" onClick={openModalLoginAgain}>
                Already registered? Log in here
            </p>

            {/* Submit Button */}
            <div className="flex justify-center gap-2">
                <Button
                    classes="inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-beige px-5 text-sm font-medium"
                    effects="hover:bg-peach"
                    onClick={handleCreateUser} // Pass the handler function reference
                >
                    S'inscrire
                </Button>
            </div>
        </div>
    );
};

export default RegistrationForm;