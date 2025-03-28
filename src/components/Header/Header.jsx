import HeaderSearch from "./HeaderSearch";
import HeaderNavigation from "./HeaderNavigation";
import HeaderShortcut from "./HeaderShortcuts";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary h-14 px-4 py-2 flex items-center justify-between shadow-md">
      {/* Logo and Search Container */}
      <HeaderSearch />
      {/* Navigation */}
      <HeaderNavigation />

      {/* Right Section */}
      <HeaderShortcut />
    </header>
  );
}
