import { FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
const Footer = () => {
    return (
        <footer className="bg-main text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                <h3 className="text-2xl font-bold mb-4 text-skin">PRO GYM</h3>
                <p className="mb-4 text-gray-300">
                    Pro Gym fitness destination with world-class facilities and expert trainers.
                </p>
                <div className="flex space-x-4">
                    <a href="#" className="bg-purple hover:bg-[#8CCDEB] w-10 h-10 rounded-full flex items-center justify-center">
                    <FaFacebookF />
                    </a>
                    <a href="#" className="bg-purple hover:bg-[#8CCDEB] w-10 h-10 rounded-full flex items-center justify-center">
                    <FaTwitter />
                    </a>
                    <a href="#" className="bg-purple hover:bg-[#8CCDEB] w-10 h-10 rounded-full flex items-center justify-center">
                    <FaInstagram />
                    </a>
                    <a href="#" className="bg-purple hover:bg-[#8CCDEB] w-10 h-10 rounded-full flex items-center justify-center">
                    <FaYoutube />
                    </a>
                </div>
                </div>
                
                <div>
                <h4 className="text-xl font-bold mb-4 text-skin">CONTACT US</h4>
                <ul className="space-y-3">
                    <li className="flex items-start">
                    <FaMapMarkerAlt className="text-[#8CCDEB] mt-1 mr-3" />
                    <span className="text-gray-300">Business Bay, Dubai, UAE</span>
                    </li>
                    <li className="flex items-center">
                    <FaPhone className="text-[#8CCDEB] mr-3" />
                    <span className="text-gray-300">+971 4 123 4567</span>
                    </li>
                    <li className="flex items-center">
                    <FaEnvelope className="text-[#8CCDEB] mr-3" />
                    <span className="text-gray-300">info@progym.ae</span>
                    </li>
                </ul>
                </div>
                
                <div>
                <h4 className="text-xl font-bold mb-4 text-skin">OPENING HOURS</h4>
                <ul className="space-y-2 text-gray-300">
                    <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>5:00 AM - 11:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>6:00 AM - 10:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>7:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                    <span>Holidays</span>
                    <span>8:00 AM - 8:00 PM</span>
                    </li>
                </ul>
                </div>
            </div>
            
            <div className="border-t border-purple mt-12 pt-8 text-center text-gray-400">
                <p>© {new Date().getFullYear()} Pro Gym. All rights reserved.</p>
            </div>
            </div>
        </footer>
    )
}

export default Footer