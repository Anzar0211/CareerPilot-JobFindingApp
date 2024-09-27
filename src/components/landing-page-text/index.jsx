const HomePageText = ({user,profileInfo}) => {
    // console.log(user,profileInfo);
  return user?(
    profileInfo?.role==="candidate"?(
        <>
            <h1 className="text-4xl font-bold md:text-5xl">
                Welcome Back! <br /> {profileInfo?.candidateInfo?.name}
            </h1>
            <p className="text-xl mt-5">
                Let's find some Jobs.Shall we?
            </p>        
        </>
    )
    :(
        <>
            <h1 className="text-4xl font-bold md:text-5xl">
                Welcome Back! <br /> {profileInfo?.recruiterInfo?.name}
            </h1>
            <p className="text-xl mt-5">
                Post Jobs and find the best candidates as per your requirements
            </p>
        </>
    )
  ):
  (
    <>
        <h1 className="text-4xl font-bold md:text-5xl ">
            Build Your Career. <br /> In Your Dream Company
        </h1>
        <p className="text-xl mt-5">
            Find Best Jobs From Top Product Based Companies
        </p>
    </>
  )
}
export default HomePageText