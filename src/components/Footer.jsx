import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Useful Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-blue-400 cursor-pointer">Home</li>
              <li className="hover:text-blue-400 cursor-pointer">Rooms</li>
              <li className="hover:text-blue-400 cursor-pointer">About</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <p className="text-gray-300">Email: support@studynook.com</p>
            <p className="text-gray-300">Phone: +880 1XXXXXXXXX</p>
          </div>

          {/* Social Icons */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>

            <div className="flex gap-4">

              {/* Facebook */}
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:scale-110 transition"
              >
                <FaXTwitter />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 hover:scale-110 transition"
              >
                <FaLinkedinIn />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-600 hover:scale-110 transition"
              >
                <FaInstagram />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} StudyNook. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;