import { fetchProfileAction } from "@/actions";
import HomePageButton from "@/components/home-page-buttons";
import HomePageText from "@/components/landing-page-text";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

const Home = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (user && !profileInfo?._id) redirect("/onboard");
  return (
    <Fragment>
      <section className="relative w-full h-full min-h-screen pb-10">
        <div className="relative h-full w-full">
          <div className="flex flex-col-reverse md:flex-row gap-10 mt-16">
            <section className="w-full md:w-[50%] flex flex-col md:px-2 md:px-0 p-5 md:p-10">
              <div className="w-full flex justify-start flex-col h-auto md:pt-7">
                <span className="flex space-x-2">
                  <span className="block w-14 mb-2 border-b-2 border-gray-700"></span>
                  <span className="font-medium text-gray-900 text-2xl">
                    Welcome to CareerPilot
                  </span>
                </span>
                <HomePageText
                  user={JSON.parse(JSON.stringify(user))}
                  profileInfo={profileInfo}
                />
                <div className="w-full mt-6 flex items-center text-white justify-start gap-2">
                  <HomePageButton
                    user={JSON.parse(JSON.stringify(user))}
                    profileInfo={profileInfo}
                  />
                </div>
              </div>
            </section>
            <section className="relative w-full md:w-[70%] flex items-center justify-end md:-mt-10 lg:-mt-20">
              <img
                src="https://shorturl.at/msw07"
                alt="Job Portal"
                className="h-full w-auto md:w-full object-contain z-10"
              />
            </section>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Home;
