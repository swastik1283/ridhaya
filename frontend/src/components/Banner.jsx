import React from 'react';
import lavenderbanner from '../assets/lavenderbanner.jpeg';
const Banner = () => {
  return (
    <section className="w-full">
      <img
        src={lavenderbanner}
        alt="Banner"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default Banner;
