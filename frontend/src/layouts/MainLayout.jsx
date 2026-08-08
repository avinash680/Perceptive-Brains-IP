import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialFab from "../components/SocialFab";

export default function MainLayout() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <Outlet />
      <SocialFab />
      <Footer />
    </main>
  );
}
