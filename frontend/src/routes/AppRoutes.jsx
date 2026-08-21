import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

import Home from "../pages/Home/Home.jsx";
import About from "../pages/About/About.jsx";
import Service from "../pages/Service/Service.jsx";
import Industries from "../pages/Industry/Industry.jsx";
import Resource from "../pages/Resource/Resource.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import NotFound from "../pages/NotFound.jsx";

import WebServices from "../pages/WebServices/WebServices.jsx";
import UxUiToolkit from "../pages/WebServices/UxUiToolkit.jsx";

import PatentSearch from "../pages/Service/Patent/PatentSearch.jsx";
import PatentDraftingFiling from "../pages/Service/Patent/PatentDraftingFiling.jsx";
import PatentProsecution from "../pages/Service/Patent/PatentProsecution.jsx";
import PatentProcess from "../pages/Service/Patent/PatentProcess.jsx";

import TrademarkRegistration from "../pages/Service/Trademark/TrademarkRegistration.jsx";
import TrademarkOpposition from "../pages/Service/Trademark/TrademarkOpposition.jsx";
import TrademarkRenewal from "../pages/Service/Trademark/TrademarkRenewal.jsx";
import BrandProtection from "../pages/Service/Trademark/BrandProtection.jsx";

import CopyrightRegistration from "../pages/Service/CopyrightDesign/CopyrightRegistration.jsx";
import DesignRegistration from "../pages/Service/CopyrightDesign/DesignRegistration.jsx";
import DesignVsPatent from "../pages/Service/CopyrightDesign/DesignVsPatent.jsx";

import IPPortfolio from "../pages/BusinessStrategy/IPPortfolio.jsx";
import IPValuation from "../pages/BusinessStrategy/IPValuation.jsx";
import StartupServices from "../pages/BusinessStrategy/StartupServices.jsx";
import IPLitigation from "../pages/BusinessStrategy/IPLitigation.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Service />} />
        <Route path="contact" element={<Contact />} />
        <Route path="industry" element={<Industries />} />
        <Route path="resource" element={<Resource />} />
        <Route path="blogs" element={<Resource />} />

        <Route path="services/patent-search" element={<PatentSearch />} />
        <Route
          path="services/patent-drafting-filing"
          element={<PatentDraftingFiling />}
        />
        <Route
          path="services/patent-prosecution"
          element={<PatentProsecution />}
        />
        <Route path="services/patent-process" element={<PatentProcess />} />

        <Route
          path="services/trademark-registration"
          element={<TrademarkRegistration />}
        />
        <Route
          path="services/trademark-opposition"
          element={<TrademarkOpposition />}
        />
        <Route
          path="services/trademark-renewal"
          element={<TrademarkRenewal />}
        />
        <Route path="services/brand-protection" element={<BrandProtection />} />

        <Route
          path="services/copyright-registration"
          element={<CopyrightRegistration />}
        />
        <Route
          path="services/industrial-design"
          element={<DesignRegistration />}
        />
        <Route path="services/design-vs-patent" element={<DesignVsPatent />} />

        <Route
          path="services/ip-portfolio-management"
          element={<IPPortfolio />}
        />
        <Route path="services/ip-valuation" element={<IPValuation />} />
        <Route path="services/startup-ip" element={<StartupServices />} />
        <Route
          path="services/ip-litigation-support"
          element={<IPLitigation />}
        />

        <Route path="services/web-development" element={<WebServices />} />
        <Route path="services/ui-ux-design" element={<UxUiToolkit />} />

        <Route path="service" element={<Navigate to="/services" replace />} />
        <Route
          path="service/patent-search"
          element={<Navigate to="/services/patent-search" replace />}
        />
        <Route
          path="service/patent-drafting-filing"
          element={<Navigate to="/services/patent-drafting-filing" replace />}
        />
        <Route
          path="service/patent-prosecution"
          element={<Navigate to="/services/patent-prosecution" replace />}
        />
        <Route
          path="patent-search"
          element={<Navigate to="/services/patent-search" replace />}
        />
        <Route
          path="patent-drafting-filing"
          element={<Navigate to="/services/patent-drafting-filing" replace />}
        />
        <Route
          path="patent-prosecution"
          element={<Navigate to="/services/patent-prosecution" replace />}
        />

        <Route
          path="service/trademark-registration"
          element={<Navigate to="/services/trademark-registration" replace />}
        />
        <Route
          path="service/trademark-opposition"
          element={<Navigate to="/services/trademark-opposition" replace />}
        />
        <Route
          path="service/trademark-renewal"
          element={<Navigate to="/services/trademark-renewal" replace />}
        />
        <Route
          path="service/brand-protection"
          element={<Navigate to="/services/brand-protection" replace />}
        />
        <Route
          path="trademark-registration"
          element={<Navigate to="/services/trademark-registration" replace />}
        />
        <Route
          path="trademark-opposition"
          element={<Navigate to="/services/trademark-opposition" replace />}
        />
        <Route
          path="trademark-renewal"
          element={<Navigate to="/services/trademark-renewal" replace />}
        />
        <Route
          path="brand-protection"
          element={<Navigate to="/services/brand-protection" replace />}
        />

        <Route
          path="service/copyright-registration"
          element={<Navigate to="/services/copyright-registration" replace />}
        />
        <Route
          path="service/industrial-design"
          element={<Navigate to="/services/industrial-design" replace />}
        />
        <Route
          path="service/design-vs-patent"
          element={<Navigate to="/services/design-vs-patent" replace />}
        />

        <Route
          path="service/ip-portfolio-management"
          element={<Navigate to="/services/ip-portfolio-management" replace />}
        />
        <Route
          path="service/ip-valuation"
          element={<Navigate to="/services/ip-valuation" replace />}
        />
        <Route
          path="service/startup-ip"
          element={<Navigate to="/services/startup-ip" replace />}
        />
        <Route
          path="service/ip-litigation-support"
          element={<Navigate to="/services/ip-litigation-support" replace />}
        />

        <Route
          path="service/ui-ux-design"
          element={<Navigate to="/services/ui-ux-design" replace />}
        />
        <Route
          path="web_services"
          element={<Navigate to="/services/web-development" replace />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
