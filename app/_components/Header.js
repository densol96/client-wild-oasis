import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header() {
  const headerHeight = "100px";

  return (
    <header className="border-b border-primary-900 px-8 h-[100px] flex">
      <div className="flex max-w-7xl w-full mx-auto justify-between items-center">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
