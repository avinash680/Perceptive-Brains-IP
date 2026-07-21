import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/home/home";
import About from "./pages/about/aboute";
import Service from "./pages/service/service";
import Industries from './pages/industry/industry'
import Blog from './pages/blog/blog';
import Resource from './pages/resource/resource'
import Contact from "./pages/contact/contact";
import Footer from "./components/footer";
import Webservices from './pages/webservices/webservice';
import UxUiToolkit from './pages/webservices/UI_UX';
import PatentSearchPage from './pages/service/Patent/patent _search';
import PatentDraftingLexgin from './pages/service/Patent/patentDraftandfilling';
import PatentProsecutionLexgin from './pages/service/Patent/patetprosecution';
import PatentProcessLexgin from './pages/service/Patent/patentProcess';
import TrademarkRegistrationPage from './pages/service/Trademark/trademarkRegistration';
import TrademarkOppositionPage from './pages/service/Trademark/trademarkOppsition';
import TrademarkRenewalPage from './pages/service/Trademark/tradmarkrenewal';
import BrandProtectionPage from './pages/service/Trademark/BrandProteation';
import CopyrightRegistrationLexgin from './pages/service/copyrightandDesign/CopyrightRegistration';
import DesignRegistrationIndia from './pages/service/copyrightandDesign/designRegistration';
import IPPortfolioManager from './pages/Bussinessstrategy/IPPortfulio';
import IPValuation from './pages/Bussinessstrategy/Ipvaluation';
import StartupIPServices from './pages/Bussinessstrategy/startupandServices';
import LitigationSupport from './pages/Bussinessstrategy/iplitigation';
import './App.css';

function App() {


  return (
    <>
     
    <main>
      <Navbar />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/industry" element={<Industries/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/resource" element={<Resource/>} />

        <Route path="/services/patent-search" element={<PatentSearchPage />} />
        <Route path="/services/patentability-search" element={<PatentSearchPage />} />
        <Route path="/services/patent-drafting-filing" element={<PatentDraftingLexgin />} />
        <Route path="/services/patent-prosecution" element={<PatentProsecutionLexgin />} />
        <Route path="/services/pct-filing" element={<PatentProcessLexgin />} />
        <Route path="/service/patent-search" element={<PatentSearchPage />} />
        <Route path="/service/patentability-search" element={<PatentSearchPage />} />
        <Route path="/service/patent-drafting-filing" element={<PatentDraftingLexgin />} />
        <Route path="/service/patent-prosecution" element={<PatentProsecutionLexgin />} />
        <Route path="/service/pct-filing" element={<PatentProcessLexgin />} />

        <Route path="/services/trademark-registration" element={<TrademarkRegistrationPage />} />
        <Route path="/services/trademark-opposition" element={<TrademarkOppositionPage />} />
        <Route path="/services/trademark-renewal" element={<TrademarkRenewalPage />} />
        <Route path="/services/brand-protection" element={<BrandProtectionPage />} />
        <Route path="/service/trademark-registration" element={<TrademarkRegistrationPage />} />
        <Route path="/service/trademark-opposition" element={<TrademarkOppositionPage />} />
        <Route path="/service/trademark-renewal" element={<TrademarkRenewalPage />} />
        <Route path="/service/brand-protection" element={<BrandProtectionPage />} />

        <Route path="/services/copyright-registration" element={<CopyrightRegistrationLexgin />} />
        <Route path="/services/industrial-design" element={<DesignRegistrationIndia />} />
        <Route path="/services/design-vs-patent" element={<DesignRegistrationIndia />} />
        <Route path="/service/copyright-registration" element={<CopyrightRegistrationLexgin />} />
        <Route path="/service/industrial-design" element={<DesignRegistrationIndia />} />
        <Route path="/service/design-vs-patent" element={<DesignRegistrationIndia />} />

        <Route path="/services/ip-portfolio-management" element={<IPPortfolioManager />} />
        <Route path="/services/ip-valuation" element={<IPValuation />} />
        <Route path="/services/startup-ip" element={<StartupIPServices />} />
        <Route path="/services/ip-litigation-support" element={<LitigationSupport />} />
        <Route path="/service/ip-portfolio-management" element={<IPPortfolioManager />} />
        <Route path="/service/ip-valuation" element={<IPValuation />} />
        <Route path="/service/startup-ip" element={<StartupIPServices />} />
        <Route path="/service/ip-litigation-support" element={<LitigationSupport />} />

        <Route path="/web_services" element={<Webservices />} />
        <Route path="/services/web-development" element={<Webservices />} />
        <Route path="/services/ui-ux-design" element={<UxUiToolkit />} />
        <Route path="/service/ui-ux-design" element={<UxUiToolkit />} />
      </Routes>
      <Footer />
    </main>
          
     
     
     
     
     
     
  
    </>
  )
}

export default App
