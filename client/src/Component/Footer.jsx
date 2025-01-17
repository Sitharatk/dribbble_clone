import React from 'react';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-wrap p-6 md:p-14 justify-between items-center space-y-6 md:space-y-0">
        {/* Logo */}
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <img src={Logo} alt="Dribbble Logo" className="w-24 h-auto" />
        </div>

        {/* Navigation Links */}
        <div className="w-full md:w-auto flex flex-wrap justify-center space-x-4 md:space-x-10 font-semibold text-center">
          <p>For designers</p>
          <p>Hire talent</p>
          <p>Inspiration</p>
          <p>Advertising</p>
          <p>Blog</p>
          <p>About</p>
          <p>Careers</p>
          <p>Support</p>
        </div>

        {/* Social Media Links */}
        <div className="w-full md:w-auto flex justify-center space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white text-xl" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="hover:text-white text-xl" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className="hover:text-white text-xl" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className="hover:text-white text-xl" aria-label="Pinterest">
            <FontAwesomeIcon icon={faPinterest} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-wrap p-6 md:p-14 justify-between text-center text-gray-400 space-y-6 md:space-y-0" style={{ fontSize: '14px' }}>
        {/* Left Links */}
        <div className="w-full md:w-auto flex flex-wrap justify-center space-x-4 md:space-x-6">
          <p>© 2025 Dribbble</p>
          <p>Terms</p>
          <p>Privacy</p>
          <p>Cookies</p>
        </div>

        {/* Right Links */}
        <div className="w-full md:w-auto flex flex-wrap justify-center space-x-4 md:space-x-6">
          <p>Jobs</p>
          <p>Designers</p>
          <p>Freelancers</p>
          <p>Tags</p>
          <p>Places</p>
          <p>Resources</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
