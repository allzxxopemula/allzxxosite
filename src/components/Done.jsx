import React from 'react';
import '../css/Done.css';

const Done = () => {
  return (
    <section className="done">
      <div className="done-container">
        <h1 className="done-text" data-aos="fade" data-aos-duration="800">
          DONE<span className="done-dot">.</span>
        </h1>
      </div>
    </section>
  );
};

export default Done;