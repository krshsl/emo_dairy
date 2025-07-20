import { createContext, useContext } from "react";

interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export { SidebarContext };
export default useSidebar;
