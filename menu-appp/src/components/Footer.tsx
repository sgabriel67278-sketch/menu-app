import SocialLink from "./SocialLink";

const Footer = () => {
  return (
    <footer
      className="mt-auto
                 bg-linear-to-r from-stone-950 via-red-950 to-amber-950
                 border-t border-amber-700/40
                 px-8 py-6
                 flex flex-wrap items-center justify-center gap-8
                 shadow-inner"
    >
      <SocialLink titulo="Facebook" />
      <SocialLink titulo="Instagram" />
      <SocialLink titulo="WhatsApp" />
      <SocialLink titulo="TikTok" />
    </footer>
  );
};

export default Footer;