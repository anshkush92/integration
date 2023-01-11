import { useState } from 'react';

import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

import Cart from '../Cart';

const Navbar = () => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const { totalQuantity } = useSelector((state) => state.cart);

  const toggleDropdown = () => {
    setIsDropdownShown((previousState) => !previousState);
  };

  const activeStyle = {
    textDecoration: 'underline',
    color: 'red',
  };

  return (
    <nav className="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="flex items-center"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-10"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Integration
          </span>
        </NavLink>

        {/* Cart Navbar button */}
        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full navbar-buttons"
              >
                Cart{' '}
                <svg
                  className="w-5 h-5 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                </svg>
              </button>

              {/*  Dropdown Menu */}
              <div
                className={`z-10 ${
                  isDropdownShown ? 'flex' : 'hidden'
                } font-normal bg-white divide-y divide-gray-100 rounded shadow px-1   ${
                  totalQuantity ? 'w-80' : 'w-auto'
                }dark:bg-gray-700 dark:divide-gray-600 absolute`}
              >
                <ul
                  className={`py-1 max-w-80 max-h-[32rem] text-sm text-gray-700 dark:text-gray-400 ${
                    totalQuantity ? 'overflow-y-scroll' : 'overflow-y-auto'
                  }`}
                >
                  <Cart />
                </ul>
              </div>
            </li>
            <li>
              <NavLink
                to="/newsletter"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="navbar-buttons"
              >
                Newsletter
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/login"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="navbar-buttons"
              >
                OTP Authentication
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
