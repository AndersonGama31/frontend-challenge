export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-20 w-full bg-[#202020] h-auto sm:h-[82px] py-4 sm:py-0 absolute bottom-0 right-0 left-0">
      <p className="text-white text-center text-xs sm:text-sm mb-2 sm:mb-0">
        Data provided by Marvel. © {new Date().getFullYear()} Marvel
      </p>
      <p className="text-white text-center text-xs sm:text-sm">Desenvolvido por Anderson Gama</p>
    </footer>
  )
}
