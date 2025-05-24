import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-[var(--dark-primary-color)] text-white shadow-md">
      <div className="text-xl font-bold">Medblocks</div>
      <div className="text-lg">Patient list</div>
    </nav>
  );
};

export default Navbar;
