import Link from 'next/link'
<<<<<<< HEAD
import { Heart } from 'lucide-react'
=======
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
<<<<<<< HEAD
    <footer className="bg-[#1C1B18] dark:bg-[#0B0A0F] text-[#B8A584] pb-24 md:pb-0">
      <div className="container-custom py-12 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 mb-12 md:mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Heart className="w-6 h-6 text-[#D4A574]" />
              <span className="text-xl font-display font-bold text-[#F5F3F0]">
                Commu<span className="text-[#D4A574]">nify</span>
              </span>
            </div>
            <p className="text-sm text-[#B8A584] mb-4 max-w-sm mx-auto md:mx-0">
              Connecting communities with resources, support, and opportunities for growth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full md:w-auto text-center md:text-left">
              <h3 className="text-[#F5F3F0] font-bold uppercase tracking-widest text-xs mb-6 opacity-60">Quick Links</h3>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-4 gap-x-8">
                <li>
                  <Link href="/directory" className="text-[#B8A584] hover:text-[#D4A574] transition-colors text-sm font-medium">
                    Resource Directory
                  </Link>
                </li>
                <li>
                  <Link href="/highlights" className="text-[#B8A584] hover:text-[#D4A574] transition-colors text-sm font-medium">
                    Featured
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="text-[#B8A584] hover:text-[#D4A574] transition-colors text-sm font-medium">
                    Submit Resource
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-[#B8A584] hover:text-[#D4A574] transition-colors text-sm font-medium">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2c2c3e]/50 pt-8 text-center text-xs font-medium text-[#B8A584]/60">
          <p suppressHydrationWarning>© {currentYear} Communify. All rights reserved.</p>
=======
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary-400" />
              <span className="text-xl font-display font-bold text-white">
                Hub<span className="text-primary-400">IO</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Connecting communities with resources, support, and opportunities for growth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/directory" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Resource Directory
                </Link>
              </li>
              <li>
                <Link href="/highlights" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Featured Resources
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Submit Resource
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Support Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Community Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Non-Profit Organizations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Volunteer Opportunities
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                <a href="mailto:info@hubio.org" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  info@hubio.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Community Ave<br />
                  Your City, ST 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} HubIO. All rights reserved. Built with ❤️ for our community.</p>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
        </div>
      </div>
    </footer>
  )
}

