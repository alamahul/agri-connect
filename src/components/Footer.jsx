import logoText from "./../assets/logo-text.png";
import linkIcon1 from "./../assets/Link - icon.png";
import linkIcon2 from "./../assets/Link - icon (1).png";
import linkIcon3 from "./../assets/Link - icon (2).png";
import linkIcon4 from "./../assets/Link - icon (3).png";
import garis from "./../assets/garis.png";
import telepon from "./../assets/icon-telepon.png";
import email from "./../assets/icon-email.png";
import map from "./../assets/icon-map.png";
import kirim from "./../assets/kirim.png";

const socialLinks = [
  { icon: linkIcon1, url: "#" },
  { icon: linkIcon2, url: "#" },
  { icon: linkIcon3, url: "#" },
  { icon: linkIcon4, url: "#" },
];

const kontakList = [
  {
    icon: telepon,
    text: "089987789987",
  },
  {
    icon: email,
    text: "agri_connect@gmail.com",
  },
  {
    icon: map,
    text: "Jl. Raya Sukajadi No. 80\nBandung, Jawa Barat, Indonesia",
  },
];

const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col md:flex-row justify-around bottom-0 bg-[#24231D] text-center py-12 md:py-24 text-[#A5A49A] !text-xs flex-wrap gap-8 px-6 sm:px-10">
        <div className="text-center md:text-start max-w-xs mx-auto md:mx-0">
          <img
            src={logoText}
            alt="logo"
            className="w-32 sm:w-[11rem] mx-auto md:mx-0"
          />
          <p className="w-full md:w-[12rem] mt-2 leading-loose !text-xs sm:text-sm">
            Proyek ini dikembangkan khusus sebagai inovasi digital dalam ajang
            TECHSOFT 2026.
          </p>
          <div className="mt-3">
            <ul className="flex gap-2 justify-center md:justify-start">
              {socialLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="block hover:scale-110 transition"
                  >
                    <img
                      src={item.icon}
                      alt={`icon-${index}`}
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center md:text-start w-full max-w-xs mx-auto md:mx-0 md:w-64">
          <div>
            <p className="text-base sm:text-lg font-bold text-white">Kontak</p>
          </div>
          <div className="flex justify-center md:justify-start">
            <img src={garis} className="w-10 sm:w-14" alt="garis" />
          </div>
          <ul>
            {kontakList.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-center md:justify-start gap-2 mb-3 text-white"
              >
                <img src={item.icon} className="object-contain w-3 flex-shrink-0" alt="" />
                <p className="!text-xs whitespace-pre-line text-left">{item.text}</p>
              </li>
            ))}
          </ul>

          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Masukkan Alamat Email"
              className="!border-0 !rounded-r-none rounded-l-lg !text-[10px] placeholder:text-[10px] placeholder:font-semibold p-2 flex-1 min-w-0"
            />
            <div className="bg-[#4BAF47] hover:bg-[#3E9440] p-2 sm:p-3 flex justify-center items-center rounded-r-lg cursor-pointer flex-shrink-0">
              <a href="#">
                <img src={kirim} className="w-2.5 sm:w-3" alt="kirim" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright Footer */}
      <div>
        <footer className="flex flex-col sm:flex-row justify-around bottom-0 bg-[#1F1E17] text-center py-4 sm:py-6 text-[#A5A49A] text-[10px] sm:text-xs flex-wrap gap-2 sm:gap-4 px-4">
          <p>© All Copyright 2026 by CuanDev</p>
          <p className="flex gap-2 sm:gap-3">
            <span>Terms of Use</span>
            <span>|</span>
            <span>Privacy Policy</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
