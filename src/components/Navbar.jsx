import React, { useState } from "react";
import Link from "./Link";
import logo from '../assets/images/logo.svg';
import { useAuth } from "../api/AuthContext";

export default function Navbar({openModalLoginRegister, handleLogoutUser}) {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { isAuthenticated, isProfileProfessional } = useAuth();
  return (
    <>
      {/*<!-- Component: Navbar with CTA --> */}
      <header className="relative z-20 w-full after:absolute after:left-0 after:top-full after:z-10 after:block after:w-full lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium"
            role="navigation"
          >
            {/* Brand logo */}
            <a
              id="WindUI"
              aria-label="Enterprise logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              href="/"
            >
              <img 
                src={logo} alt="Company Logo" 
                width="300"
                height="300"
                viewBox="0 0 300 300"
                className="h-12 w-12"
              />
              <span>JobFinder</span>
            </a>
            {/* Mobile trigger */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-black transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-black transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-black transition-all duration-300"
                ></span>
              </div>
            </button>
            {/* Navigation links */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[100rem] md:h-[100rem] lg:h-auto w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain 0 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <Link to="/" classes="p-2 lg:border-2 lg:border-transparent lg:border-4 lg:border-8 hover:border-dashed hover:border-beige">Notre service</Link>
              </li>
              <li role="none" className="flex items-stretch">
                <Link to="/offers" classes=" p-2 lg:border-2 lg:border-transparent lg:border-4 lg:border-8 hover:border-dashed hover:border-beige">Trouver mon emploi</Link>
              </li>
              <li role="none" className="flex items-stretch">
                <Link to="/about" classes="p-2 lg:border-2 lg:border-transparent lg:border-4 lg:border-8 hover:border-dashed hover:border-beige">A propos</Link>
              </li>
              {isAuthenticated && isProfileProfessional && (
                <li role="none" className="flex items-stretch">
                  <Link 
                    to="/my-offers"
                    classes="p-2 lg:border-2 lg:border-transparent lg:border-4 lg:border-8 hover:border-dashed hover:border-beige"
                  >
                    Mes offres
                  </Link>
                </li>
              )}
              { isAuthenticated && 
                <li role="none" className="flex items-stretch">
                  <Link to="/account" classes="p-2 lg:border-2 lg:border-transparent lg:border-4 lg:border-8 hover:border-dashed hover:border-beige">Mon compte</Link>
                </li>
              } 
            </ul>
            { isAuthenticated ? 
              <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0" onClick={handleLogoutUser}>
                <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-beige border-2 border-black cursor-pointer ">
                  <span>Déconnexion</span>
                </button>
              </div>
            :
              <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0" onClick={openModalLoginRegister}>
                <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-beige border-2 border-black cursor-pointer ">
                  <span>Connexion</span>
                </button>
              </div>
            } 
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with CTA --> */}
    </>
  );
}