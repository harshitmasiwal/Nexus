import { Menu, X, Home, User, Briefcase, Mail, Rocket, LogOut , SquarePlus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';

const Navbar = ({props}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);




  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(logoutUser())
  }

  const navLinks = [
    { name: 'Profile', icon: User, onClick: () => alert('Services clicked') },
    { name: 'Logout', icon: LogOut, onClick: () => handleLogout() },
  ];

  console.log(props.role)
    if(props.role === 'admin'){
      const addproblem = {name : 'Create Problem', icon : SquarePlus , onClick : ()=>alert('create problem')}
    navLinks.splice(0,0,addproblem)
  }



  console.log(navLinks)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (currentScrollY < 100) setIsVisible(true);
      else if (diff > 10 && !isOpen) setIsVisible(false);
      else if (diff < -10) setIsVisible(true);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const BrandLogo = ({ textSize = 'text-xl', iconSize = 'w-6 h-6' }) => (
    <div className="flex items-center space-x-2">
      <Rocket className={`${iconSize} text-amber-500 transform hover:rotate-6 transition-transform duration-500`} />
      <span className={`${textSize} font-extrabold text-gray-50`}>Code Masti</span>
    </div>
  );

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-8xl transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between px-6 py-3 bg-zinc-800/80 backdrop-blur-lg border border-zinc-700 rounded-2xl shadow-2xl shadow-black/70">
        <BrandLogo />
        <div className="flex items-center space-x-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.name}
                onClick={link.onClick}
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-all duration-300 group p-2 rounded-md hover:bg-zinc-700/50"
              >
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">{link.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden bg-zinc-800/80 backdrop-blur-lg border border-zinc-700 rounded-2xl shadow-2xl shadow-black/70">
        <div className="flex items-center justify-between p-4">
          <BrandLogo textSize="text-lg" iconSize="w-5 h-5" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-300 hover:text-amber-400 hover:bg-zinc-700 rounded-lg transition-colors duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="p-4 space-y-2 border-t border-zinc-700/50 flex flex-col">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-all duration-300 p-3 rounded-lg hover:bg-zinc-700/50 w-full"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
