import dynamic from "next/dynamic";
import Image from "next/image";
import landingImage from '../public/rb_5166.png'

const HomePageButton = dynamic(() => import("@/components/home-page-buttons"), {
  ssr: false,
});
const HomePageText = dynamic(() => import("@/components/landing-page-text"), {
  ssr: false,
});
const TestimonialSection = dynamic(() => import("@/components/testimonial-section"), {
  ssr: false,
});

import { fetchProfileAction } from "@/actions";
// import HomePageButton from "@/components/home-page-buttons";
// import HomePageText from "@/components/landing-page-text";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

const Home = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (user && !profileInfo?._id) redirect("/onboard");
  return (
    <Fragment>
      {/* Hero Section - Takes full available space */}
      <section className="flex-1 flex flex-col justify-center px-4 md:px-6 lg:px-8 xl:px-12 py-8 lg:py-12">
        <div className="w-full max-w-none h-full">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center h-full min-h-[500px] lg:min-h-[600px]">
            {/* Content Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <span className="flex space-x-3 items-center">
                  <span className="block w-12 md:w-16 lg:w-20 border-b-2 border-blue-600 dark:border-blue-400"></span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg md:text-xl lg:text-2xl whitespace-nowrap">
                    Welcome to CareerPilot
                  </span>
                </span>
                <HomePageText
                  user={JSON.parse(JSON.stringify(user))}
                  profileInfo={profileInfo}
                />
                <div className="flex items-center justify-start gap-3 pt-4">
                  <HomePageButton
                    user={JSON.parse(JSON.stringify(user))}
                    profileInfo={profileInfo}
                  />
                </div>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                <Image
                  src={landingImage}
                  alt="Job Portal - Find Your Dream Career"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 95vw, (max-width: 1024px) 50vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <TestimonialSection />
    </Fragment>
  );
};
export default Home;
