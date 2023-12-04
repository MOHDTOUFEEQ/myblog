import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container flex flex-wrap justify-between align-center">
        {/* About Us */}
        <div className="col-span-1 w-3/6">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-sm">I am a seasoned web developer with a wealth of experience, specializing in the creation of robust and innovative web solutions. My expertise encompasses a broad range of technologies and frameworks, allowing me to craft dynamic and efficient web applications tailored to meet the unique requirements of diverse projects.</p>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="text-sm">Email: mohdtoufeeq1447@gmail.com</p>
          {/* <p className="text-sm">Phone: (+44)</p> */}
        </div>

        {/* Social Media */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/mohammed-toufeeq-956042266/" target='_blank' className="text-blue-500 text-white hover:text-blue-700" title="Facebook">
              LinkedIn
            </a>
            <a href="https://github.com/MOHDTOUFEEQ" target='_blank' className="text-blue-400 text-white hover:text-blue-600" title="Twitter">
              {/* <i className="fab fa-twitter"></i> */}
              Github
            </a>
            <a href="#" className="text-red-500 hover:text-red-700" title="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
            {/* Add more social icons as needed */}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center">
        <p className="text-sm">&copy; 2023 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
