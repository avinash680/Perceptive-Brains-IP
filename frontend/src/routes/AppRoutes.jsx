import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Service from "../pages/service/Service";
import Industries from "../pages/industry/Industry";
import Blog from "../pages/blog/Blog";
import Resource from "../pages/resource/Resource";
import Contact from "../pages/contact/Contact";
import WebServices from "../pages/webservices/WebServices";
import UxUiToolkit from "../pages/webservices/UxUiToolkit";
import PatentSearch from "../pages/service/Patent/PatentSearch";
import PatentDraftingFiling from "../pages/service/Patent/PatentDraftingFiling";
import PatentProsecution from "../pages/service/Patent/PatentProsecution";
import PatentProcess from "../pages/service/Patent/PatentProcess";
import TrademarkRegistration from "../pages/service/Trademark/TrademarkRegistration";
import TrademarkOpposition from "../pages/service/Trademark/TrademarkOpposition";
import TrademarkRenewal from "../pages/service/Trademark/TrademarkRenewal";
import BrandProtection from "../pages/service/Trademark/BrandProtection";
import CopyrightRegistration from "../pages/service/CopyrightDesign/CopyrightRegistration";
import DesignRegistration from "../pages/service/CopyrightDesign/DesignRegistration";
import DesignVsPatent from "../pages/service/CopyrightDesign/DesignVsPatent";
import IPPortfolio from "../pages/BusinessStrategy/IPPortfolio";
import IPValuation from "../pages/BusinessStrategy/IPValuation";
import StartupServices from "../pages/BusinessStrategy/StartupServices";
import IPLitigation from "../pages/BusinessStrategy/IPLitigation";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="service" element={<Service />} />
        <Route path="services" element={<Service />} />
        <Route path="contact" element={<Contact />} />
        <Route path="industry" element={<Industries />} />
        <Route path="blog" element={<Blog />} />
        <Route path="resource" element={<Resource />} />

        <Route path="services/patent-search" element={<PatentSearch />} />
        <Route path="services/patentability-search" element={<PatentSearch />} />
        <Route path="services/patent-drafting-filing" element={<PatentDraftingFiling />} />
        <Route path="services/patent-prosecution" element={<PatentProsecution />} />
        <Route path="services/pct-filing" element={<PatentProcess />} />
        <Route path="service/patent-search" element={<PatentSearch />} />
        <Route path="service/patentability-search" element={<PatentSearch />} />
        <Route path="service/patent-drafting-filing" element={<PatentDraftingFiling />} />
        <Route path="service/patent-prosecution" element={<PatentProsecution />} />
        <Route path="service/pct-filing" element={<PatentProcess />} />

        <Route path="services/trademark-registration" element={<TrademarkRegistration />} />
        <Route path="services/trademark-opposition" element={<TrademarkOpposition />} />
        <Route path="services/trademark-renewal" element={<TrademarkRenewal />} />
        <Route path="services/brand-protection" element={<BrandProtection />} />
        <Route path="service/trademark-registration" element={<TrademarkRegistration />} />
        <Route path="service/trademark-opposition" element={<TrademarkOpposition />} />
        <Route path="service/trademark-renewal" element={<TrademarkRenewal />} />
        <Route path="service/brand-protection" element={<BrandProtection />} />

        <Route path="services/copyright-registration" element={<CopyrightRegistration />} />
        <Route path="services/industrial-design" element={<DesignRegistration />} />
        <Route path="services/design-vs-patent" element={<DesignVsPatent />} />
        <Route path="service/copyright-registration" element={<CopyrightRegistration />} />
        <Route path="service/industrial-design" element={<DesignRegistration />} />
        <Route path="service/design-vs-patent" element={<DesignVsPatent />} />

        <Route path="services/ip-portfolio-management" element={<IPPortfolio />} />
        <Route path="services/ip-valuation" element={<IPValuation />} />
        <Route path="services/startup-ip" element={<StartupServices />} />
        <Route path="services/ip-litigation-support" element={<IPLitigation />} />
        <Route path="service/ip-portfolio-management" element={<IPPortfolio />} />
        <Route path="service/ip-valuation" element={<IPValuation />} />
        <Route path="service/startup-ip" element={<StartupServices />} />
        <Route path="service/ip-litigation-support" element={<IPLitigation />} />

        <Route path="web_services" element={<WebServices />} />
        <Route path="services/web-development" element={<WebServices />} />
        <Route path="services/ui-ux-design" element={<UxUiToolkit />} />
        <Route path="service/ui-ux-design" element={<UxUiToolkit />} />
      </Route>
    </Routes>
  );
}
