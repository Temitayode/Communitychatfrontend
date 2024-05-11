// import React from "react";
// import { BiLogOut } from "react-icons/bi";
// import { CiSearch } from "react-icons/ci";
// import { Link, useLocation } from "react-router-dom";
// import logoImage from "../../assets/Biopic.png";
// import { useAuthContext } from "../../context/AuthContext";
// import useLogout from "../../hooks/useLogout";

// const Navbar = () => {
//   const { authUser } = useAuthContext();
//   const { loading, logout } = useLogout();
//   const { pathname } = useLocation();
//   return (
//     <>
//       <nav className="bg-white shadow-lg">
//         <div className="container mx-auto px-4 py-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Link to="/">
//                 <img src={logoImage} alt="Logo" className="h-8" />
//               </Link>
//             </div>
//             {pathname === "/community" && (
//               <div className="w-[400px] relative">
//                 <input
//                   className="shadow appearance-none border rounded-full w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
//                   id="username"
//                   type="text"
//                   placeholder="Search the community"
//                 />
//                 <div className="absolute inset-y-0 left-20 flex items-center pl-3">
//                   <CiSearch className="text-[#999999]" />
//                 </div>
//               </div>
//             )}

//             <div className="flex items-center space-x-4">
//               {authUser ? (
//                 // <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Logout</Link>
//                 <>
//                   <span className="text-gray-600">
//                     Welcome, {authUser.username}
//                   </span>
//                   {!loading ? (
//                     <BiLogOut
//                       className="w-6 h-6 text-black cursor-pointer"
//                       onClick={logout}
//                     />
//                   ) : (
//                     <span className="loading loading-spinner"></span>
//                   )}
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
//                   >
//                     Signup
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { BiLogOut, BiMenu, BiX } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../../assets/Biopic.png";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import CommunitySidebar from "../communitySidebar/CommunitySidebar";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-lg w-screen fixed flex items-center z-20 h-20 top-0">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src={logoImage} alt="Logo" className="h-8" />
            </Link>
          </div>

          {isMenuOpen ? (
            <div className="lg:hidden">
              <BiX
                className="w-8 h-8 text-gray-700 cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
          ) : (
            <div className="lg:hidden">
              <BiMenu
                className="w-8 h-8 text-gray-700 cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
          )}

          <div className="hidden lg:flex items-center space-x-4">
            {authUser && (
              <>
                <span className="text-gray-600">
                  Welcome, {authUser.username}
                </span>
                {!loading ? (
                  <BiLogOut
                    className="w-6 h-6 text-black cursor-pointer"
                    onClick={logout}
                  />
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden">
          <CommunitySidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
      )}
    </>
  );
};

export default Navbar;
