import SideNavigation from "../_components/SideNavigation";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-12 make-header-sticky">
      <SideNavigation />
      <div className="py-1 overflow-y-auto grid-col second-grid-column">
        {children}
      </div>
    </div>
  );
}

export default Layout;
