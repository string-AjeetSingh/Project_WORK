import { NavShow, Section1, Section2, Section3 } from "./subComponents";


function CreatePost({ }) {
  return (
    <>
      <div className="p-1">
        <div className="flex flex-row   ">
          <div className="text-4xl font-serif 
          text-teal-600 mt-3 ml-3 mb-4 ">
            Create Post
          </div>

        </div>
        <div className="flex flex-row 
         justify-center ">
          <NavShow></NavShow>
        </div>

        <div className="flex flex-row 
         justify-center w-full  ">
          <Section1></Section1>
        </div>

        <hr></hr>

        <div className="flex flex-row 
         justify-center w-full  ">
          <Section2></Section2>
        </div>

        <hr></hr>

        <div className="flex flex-row 
         justify-center w-full  ">
          <Section3></Section3>
        </div>

      </div>
    </>
  );
}

export { CreatePost }
