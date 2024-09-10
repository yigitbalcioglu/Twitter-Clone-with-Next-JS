import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/layout/Sidebar"

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
        <div className="min-h-screen h-[100%] bg-black">
          <div className="container h-full mx-auto xl:px-30 max-w-8xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="border-x-[1px] lg:col-span-2 border-neutral-800">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>


  );
}

export default Layout