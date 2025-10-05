import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-zinc-950 border-t border-gray-300 dark:border-zinc-800 py-4 px-6 sm:flex sm:items-center sm:justify-between">
      
      {/* Branding */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">
          Made by
        </p>
        <span className="font-semibold text-lg text-gray-900 dark:text-white">
          @Mayank
        </span>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-3 mt-3 sm:mt-0">
        <Link to="https://www.linkedin.com/in/mayank-btech-cse/" target="_blank">
          <Button variant="outline" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900">
            <FaLinkedinIn className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="sr-only">Linkedin</span>
          </Button>
        </Link>

        <Link to="https://github.com/Mayankjain995" target="_blank">
          <Button variant="outline" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-800">
            <FaGithub className="h-6 w-6 text-gray-800 dark:text-gray-100" />
            <span className="sr-only">Github</span>
          </Button>
        </Link>

        <Link to="https://www.instagram.com/mayank.bhandari.99/" target="_blank">
          <Button variant="outline" size="icon" className="hover:bg-pink-100 dark:hover:bg-pink-900">
            <FaInstagram className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <span className="sr-only">Instagram</span>
          </Button>
        </Link>
      </div>

    </footer>
  );
};

export default Footer;
