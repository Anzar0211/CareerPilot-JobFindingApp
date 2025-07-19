const HomePageText = ({user,profileInfo}) => {
    // console.log(user,profileInfo);
  return user?(
    profileInfo?.role==="candidate"?(
        <>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl leading-tight dark:text-white text-gray-900">
                Hey There! <br /> <span className="text-blue-600 dark:text-blue-400">{profileInfo?.candidateInfo?.name}</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mt-4 md:mt-5 lg:mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                Let's find some Jobs. Shall we?
            </p>        
        </>
    )
    :(
        <>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl leading-tight dark:text-white text-gray-900">
                Hey There! <br /> <span className="text-blue-600 dark:text-blue-400">{profileInfo?.recruiterInfo?.name}</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mt-4 md:mt-5 lg:mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                Post Jobs and find the best candidates as per your requirements
            </p>
        </>
    )
  ):
  (
    <>
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl leading-tight dark:text-white text-gray-900">
            Build Your Career. <br /> <span className="text-blue-600 dark:text-blue-400">In Your Dream Company</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mt-4 md:mt-5 lg:mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
            Find Best Jobs From Top Product Based Companies
        </p>
    </>
  )
}
export default HomePageText