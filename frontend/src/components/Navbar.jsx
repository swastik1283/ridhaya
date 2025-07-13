import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';


const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {getCartCount,cartItems,showSearch,setShowSearch}=useContext(ShopContext)
 console.log("Cart Items:", cartItems);
  return (
    <div className="flex items-center justify-between py-5 font-medium w-full px-4 sm:px-20">
      <div className="flex-items-center justify-between px-20 ">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>
</div>
      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-7 text-sm text-gray-700">
      <li className="relative group cursor-pointer">
  <NavLink
    to="/"
    className="flex flex-col items-center gap-1 text-gray-700"
  >
    {/* Align text + arrow in a single horizontal row */}
    <div className="flex items-center gap-1">
      <NavLink to = '/Bestseller'><span className="text-sm cursor-pointer hover:text-black text-center">Best Seller</span>
     </NavLink>
    </div>

    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
  </NavLink>


  {/* <div className="absolute hidden group-hover:flex flex-col gap-2 w-screen py-3 px-5 bg-slate-100 text-gray-500 rounded top-full left-0 -translate-x-1/2 z-50">
    <NavLink to='/ProductOil'><p className="cursor-pointer hover:text-black text-center" >Lavender Oil</p></NavLink>
   <NavLink to='/ProductFacewash'><p className="cursor-pointer hover:text-black text-center">Lavender Home Products</p></NavLink>
 <NavLink to='/ProductOil'>   <p className="cursor-pointer hover:text-black text-center">Lavender Soaps</p></NavLink>
  </div> */}
</li>


          <li className="relative group cursor-pointer">
  <NavLink
    to="/"
    className="flex flex-col items-center gap-1 text-gray-700"
  >
    {/* Align text + arrow in a single horizontal row */}
    <div className="flex items-center gap-1">
      <span className="text-sm">Shop By Category</span>
      <span className="text-sm transition-transform duration-300 group-hover:rotate-180">˅</span>
    </div>

    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
  </NavLink>


  <div className="absolute hidden group-hover:flex flex-col gap-2 w-screen py-3 px-5 bg-slate-100 text-gray-500 rounded top-full left-0 -translate-x-1/2 z-50">
   <NavLink to ="/Men"> <p className="cursor-pointer hover:text-black text-center">Men</p></NavLink>
   <NavLink to ="/Women"> <p className="cursor-pointer hover:text-black text-center">Women</p></NavLink>
   
  </div>
</li>
        {/* <li className="relative group cursor-pointer">
  <NavLink
    to="/"
    className="flex flex-col items-center gap-1 text-gray-700"
  >
    {/* Align text + arrow in a single horizontal row *
    <div className="flex items-center gap-1">
      <span className="text-sm">Gifting</span>
      <span className="text-sm transition-transform duration-300 group-hover:rotate-180">˅</span>
    </div>

    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
  </NavLink>


  <div className="absolute hidden group-hover:flex flex-col gap-2 w-screen py-3 px-5 bg-slate-100 text-gray-500 rounded top-full left-0 -translate-x-1/2 z-50">
    <p className="cursor-pointer hover:text-black text-center">Birthday</p>
    <p className="cursor-pointer hover:text-black text-center">Anniversary</p>
    <p className="cursor-pointer hover:text-black text-center">Special Moments</p>
  </div>
</li> */}

  <li className="relative group cursor-pointer">
  <NavLink
    to="/"
    className="flex flex-col items-center gap-1 text-gray-700"
  >
    {/* Align text + arrow in a single horizontal row */}
    <div className="flex items-center gap-1">
      <span className="text-sm">Help and Support</span>
      <span className="text-sm transition-transform duration-300 group-hover:rotate-180">˅</span>
    </div>

    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
  </NavLink>


  <div className="absolute hidden group-hover:flex flex-col gap-2 w-screen py-3 px-5 bg-slate-100 text-gray-500 rounded top-full left-0 -translate-x-1/2 z-50">
    <p className="cursor-pointer hover:text-black text-center text-center">My orders</p>
    <p className="cursor-pointer hover:text-black text-center text-center">Terms and Condition</p>
    <p className="cursor-pointer hover:text-black text-center text-center">Delievery</p>
  </div>
</li>
      </ul>

      {/* Icons and Dropdown */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(!showSearch)} // Toggle the search bar
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Icon */}
        <div className="relative group">
          <Link to={'/login'}><img className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile" /></Link>
          <div className="hidden group-hover:block hover:z-20 absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
            <p className="cursor-pointer hover:text-black text-center">My Profile</p>
               <NavLink to="/cart" ><p className="cursor-pointer hover:text-black text-center">Orders</p></NavLink>
              <p className="cursor-pointer hover:text-black text-center">LogOut</p>
            </div>
          </div>
        </div>

        {/* Cart Icon */}
        <NavLink to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
{getCartCount()}

          </p>
         

        </NavLink>

        {/* Mobile Menu Icon */}
        <img  
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <div className={`fixed top-0 bottom-0 left-0 right-0 bg-white z-50 transition-all ${visible ? 'w-full' : 'w-0 overflow-hidden'}`}>

        <div className="flex flex-col h-100 text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collections">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
