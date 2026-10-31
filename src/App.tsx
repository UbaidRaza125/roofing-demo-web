import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EmergencyBanner } from './components/EmergencyBanner';
import { InspectionProof } from './components/InspectionProof';
import { BallparkEstimator } from './components/BallparkEstimator';
import { ServicesSection } from './components/ServicesSection';
import { MaterialsComparison } from './components/MaterialsComparison';
import { ProcessSection } from './components/ProcessSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { EstimateForm } from './components/EstimateForm';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  const [estimateInitialValues, setEstimateInitialValues] = useState<{
    serviceType?: string;
    materialInterest?: string;
    description?: string;
  }>({});

  const scrollToEstimate = () => {
    const el = document.getElementById('estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLockInEstimate = (data: {
    sqft: number;
    materialId: string;
    estimateRange: string;
  }) => {
    // Map materialId to material label
    const materialMap: Record<string, string> = {
      arch_shingle: 'Architectural Dimensional Shingles',
      standing_seam: 'Matte Standing Seam Metal',
      impact_shingle: 'Class 4 Impact-Resistant Shingles',
      composite_slate: 'Synthetic Composite Slate',
      tpo_flat: 'Single-Ply TPO Membrane',
      designer_asphalt: 'Designer Landmark High-Definition',
    };

    setEstimateInitialValues({
      serviceType: 'Roof Replacement',
      materialInterest: materialMap[data.materialId] || 'Architectural Dimensional Shingles',
      description: `Ballpark Calculator estimate generated: ~${data.sqft.toLocaleString()} sq ft home area. Estimated cost band: ${data.estimateRange}.`,
    });

    scrollToEstimate();
  };

  const handleSelectService = (serviceTitle: string) => {
    setEstimateInitialValues({
      serviceType: serviceTitle,
      description: `Inquiring about ${serviceTitle}. Please review project scope during on-site inspection.`,
    });
    scrollToEstimate();
  };

  const handleSelectMaterial = (materialName: string) => {
    setEstimateInitialValues({
      materialInterest: materialName,
      description: `Interested in ${materialName} for our roof. Please bring physical samples to the inspection.`,
    });
    scrollToEstimate();
  };

  const handleRequestQuoteForSimilar = (projectTitle: string) => {
    setEstimateInitialValues({
      description: `Interested in a roofing installation similar to the "${projectTitle}" showcase project.`,
    });
    scrollToEstimate();
  };

  return (
    <div className="min-h-screen bg-[#111210] text-[#F7F6F0] flex flex-col font-sans selection:bg-[#D9FF36] selection:text-[#111210]">
      {/* Navigation */}
      <Navbar onOpenEstimate={scrollToEstimate} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenEstimate={scrollToEstimate} onExploreWork={scrollToWork} />

        {/* 2. Emergency Storm/Leak Banner */}
        <EmergencyBanner onOpenEstimate={scrollToEstimate} />

        {/* 3. Inspection Proof ("45 minutes on your roof, report within 24 hours") */}
        <InspectionProof onOpenEstimate={scrollToEstimate} />

        {/* 4. Halden-Signature Ballpark Roof Estimator */}
        <BallparkEstimator onLockInEstimate={handleLockInEstimate} />

        {/* 5. Core Services */}
        <ServicesSection onSelectServiceForEstimate={handleSelectService} />

        {/* 6. Honest Material Matrix ("Six roofs we install, compared honestly") */}
        <MaterialsComparison onSelectMaterial={handleSelectMaterial} />

        {/* 7. Process Section ("Down to the deck and back again") */}
        <ProcessSection onOpenEstimate={scrollToEstimate} />

        {/* 8. Project Showcase ("Built right. Built to last.") */}
        <ProjectShowcase onRequestQuoteForSimilar={handleRequestQuoteForSimilar} />

        {/* 9. About Marcus & In-House Standards */}
        <AboutSection onOpenEstimate={scrollToEstimate} />

        {/* 10. Homeowner Testimonials */}
        <TestimonialsSection />

        {/* 11. Lead Capture Estimate Form */}
        <EstimateForm
          initialValues={estimateInitialValues}
          onClearInitialValues={() => setEstimateInitialValues({})}
        />

        {/* 12. Accessible FAQ Accordion */}
        <FAQSection />

        {/* 13. Final Call to Action */}
        <FinalCTA onOpenEstimate={scrollToEstimate} />
      </main>

      {/* Footer */}
      <Footer onOpenEstimate={scrollToEstimate} />
    </div>
  );
}
