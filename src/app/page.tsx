import MagicButton from '@/components/UI/magickButton';

import Faqs from '@/components/Home/Faqs/Faqs';
import Hero from '@/components/Home/Hero/Hero';
import ProjectStatistics from '@/components/Home/ProjectStatistics/ProjectStatistics';
import RoleSelectionLink from '@/components/Home/RoleSelectionLink/RoleSelectionLink';
import Testimonials from '@/components/Home/Testimonials/Testimonials';
import WhatWeOffer from '@/components/Home/WhatWeOffer/WhatWeOffer';
import ModalWithMap from '@/components/GoogleMaps/GoogleMaps';

export default function Home() {
  return (
    <>
      <ModalWithMap />
      <Hero />
      <RoleSelectionLink />
      <ProjectStatistics />
      <WhatWeOffer />
      <Testimonials />
      <Faqs />
      <MagicButton />
    </>
  );
}
