import React from 'react';
import snap from '../Images/signup form.png';
import snap1 from '../Images/contact page.png';
import snap2 from '../Images/home page.png';
import snap3 from '../Images/wishlist.png';
import snap4 from '../Images/home.png';
import snap5 from '../Images/contact.png';
import snap6 from '../Images/login.png';
import snap7 from '../Images/account.png';


function Projects() {
  return (
    <div className="container py-2">
      <h1 className="text-white mb-4">Projects</h1>
      <p className="text-light">
        The Agriculture Product Selling Website is an online platform that connects farmers and agricultural
        product suppliers with buyers, allowing them to sell fresh produce, seeds, fertilizers, tools, and more
        directly through a digital storefront.
      </p>

      <h5 className="text-white my-4">Screenshots</h5>

      <div className="row g-4">
        {[snap, snap1, snap2, snap3].map((image, index) => (
          <div className="col-12 col-sm-6 col-lg-6" key={index}>
            <img
              src={image}
              className="img-fluid rounded shadow snapshot w-100"
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 link">
  <a
    href="https://agriculture-product-selling-website-sg9d.onrender.com"
    target="_blank"
    rel="noreferrer"
    style={{ color: 'white', backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
  >
    Visit Project
  </a>
</div>
<div className="row g-4 mt-3">
        {[snap4, snap5, snap6, snap7].map((image, index) => (
          <div className="col-12 col-sm-6 col-lg-6" key={index}>
            <img
              src={image}
              className="img-fluid rounded shadow snapshot w-100"
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        ))}
      </div>
       <div className="mt-4 link">
  <a
    href="https://freelancer-website-bw7d.onrender.com"
    target="_blank"
    rel="noreferrer"
    style={{ color: 'white', backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
  >
    Visit Project
  </a>
</div>

    </div>
  );
}

export default Projects;
