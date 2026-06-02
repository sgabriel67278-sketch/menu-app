interface HeaderProps {
  titulo: string;
  descripcion?: string;
}

const Header = ({ titulo, descripcion }: HeaderProps) => {
  return (
    <header
      className="relative overflow-hidden
                 bg-linear-to-r from-amber-950 via-red-950 to-stone-950
                 border-b border-amber-700/40
                 px-6 py-10 md:py-14
                 shadow-xl"
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl
                     font-extrabold tracking-wide
                     text-amber-100 drop-shadow-lg"
        >
          {titulo}
        </h1>

        {descripcion && (
          <p
            className="mt-4 max-w-3xl
                       text-sm md:text-lg
                       text-amber-200/80
                       leading-relaxed"
          >
            {descripcion}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;