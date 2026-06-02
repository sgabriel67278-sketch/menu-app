interface SocialLinkProps {
  titulo: string;
}

const SocialLink = ({ titulo }: SocialLinkProps) => {
  return (
    <a
      href="#"
      className="px-4 py-2 rounded-xl
                 bg-black/20 border border-amber-700/20
                 text-amber-100/80 text-sm font-medium
                 hover:text-white
                 hover:bg-amber-700/20
                 hover:border-amber-500/50
                 hover:shadow-lg
                 hover:-translate-y-1
                 transition-all duration-300"
    >
      {titulo}
    </a>
  );
};

export default SocialLink;