import React, { useState, useContext } from "react";
import InputText from "../inputs/InputText";
import Button from "./Button";
import { loginUser } from "../../api/UserService";

const LoginForm = ({ openModalRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorConnection, setErrorConnection] = useState("");


  // Function to handle form submission
  const handleLoginUser = async () => {
    let hasError = false;

    // Reset error messages
    setErrorConnection("");

    // Validate form fields
    if (!username || !password) {
      setErrorConnection("Le nom d'utilisateur et mot de passe sont requis.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Prepare user data object
    const userData = {
      username,
      password,
    };

    // Call the loginUser function
    try {
      await loginUser(userData);
      window.location.reload();
    } catch (error) {
      // Set field-specific error messages if login fails
      if (error.response && error.response.status === 401) {
        setErrorConnection("Nom d'utilisateur ou mot de passe incorrect.");
      }
    }
  };

  return (
    <div id="content-4a" className="flex-1">
        <div className="flex flex-col gap-6">
            <div className="relative">
                <InputText
                    id="input-username"
                    label="Votre nom d'utilisateur"
                    help="Tapez votre nom d'utilisateur"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="relative my-6">
                <InputText
                    id="input-pwd"
                    label="Votre mot de passe"
                    help="Tapez votre mot de passe"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
        {errorConnection && (
            <p className="text-red-500 text-sm text-center">{errorConnection}</p>
        )}
        <p
            className="flex justify-center gap-2 underline cursor-pointer mt-4"
            onClick={openModalRegister}
        >
            Pas inscrit ? Créez un compte
        </p>

        <div className="flex justify-center gap-2 mt-4">
            <Button
                classes="inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-beige px-5 text-sm font-medium"
                effects="hover:bg-peach"
                onClick={handleLoginUser}
            >
                Se connecter
            </Button>
        </div>
    </div>
  );
};

export default LoginForm;
