import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import RegistrationForm from "./forms/RegistrationForm";
import LoginForm from "./forms/LoginForm";

export default function ModalLoginRegister({
  closeModalLoginRegister,
  isModalLoginRegisterOpen,
}) {
  const wrapperRef = useRef(null);
  const [showRegister, setShowRegister] = useState(false);

  // Function to toggle between login and register modals
  const openModalRegister = () => setShowRegister(true);
  const openModalLoginAgain = () => setShowRegister(false);

  // Close modal if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeModalLoginRegister();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModalLoginRegister]);

  // Manage body scroll and keyboard interactions
  useEffect(() => {
    const html = document.querySelector("html");
    const modal = document.querySelector("#modal");

    if (isModalLoginRegisterOpen) {
      html.style.overflowY = "hidden";

      const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusableContent = modal.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableContent[0];
      const lastFocusableElement =
        focusableContent[focusableContent.length - 1];

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          closeModalLoginRegister();
        }

        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          } else if (
            !e.shiftKey &&
            document.activeElement === lastFocusableElement
          ) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      };

      firstFocusableElement?.focus();
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        html.style.overflowY = "visible";
      };
    }
  }, [isModalLoginRegisterOpen, closeModalLoginRegister]);

  if (!isModalLoginRegisterOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      {/* Modal */}
      <div
        ref={wrapperRef}
        className="flex max-h-[90vh] max-w-sm flex-col gap-4 overflow-hidden rounded bg-white p-6 shadow-slate-700/10"
        id="modal"
        role="document"
      >
        {/* Modal Header */}
        <header className="flex items-center">
          <h3 id="modal-title" className="flex-1 text-lg font-medium">
            {showRegister ? "Create an Account" : "Welcome back!"}
          </h3>
          <button
            onClick={closeModalLoginRegister}
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

        {/* Conditionally render Login or Register form */}
        {!showRegister ? (
          <LoginForm openModalRegister={openModalRegister} />
        ) : (
          <RegistrationForm openModalLoginAgain={openModalLoginAgain} />
        )}
      </div>
    </div>,
    document.body
  );
}
