import { useReducer, useState, useRef, useEffect } from "react";
import { NavShow, Section1, Section2, Section3 } from "./subComponents";
import { flushSync } from "react-dom";

function CreatePost({ }) {

  const [highLightNav, sethighLightNav] = useState(1);

  const initialValues = useRef({
    noNavShows: 3,
    currentSection: 1,
    lastSection: 3,
    nextSection: null,
    allSectionsArr: [null,
      <Section1 animation={true}
        outOn={setOn}
        outOff={setOff}
        buttonHandle1={handleSectionButtons} />,

      <Section2 animation={true}
        outOn={setOn}
        outOff={setOff}
        buttonHandle1={handleSectionButtons} />,

      <Section3 animation={true}
        outOn={setOn}
        outOff={setOff}
        buttonHandle1={handleSectionButtons} />
    ]
  });

  const animationSwitch = useRef({
    on: null,
    off: null
  });

  const [sectionArr, setsectionArr] =
    useState(<Section2 animation={true}
      outOn={setOn}
      outOff={setOff}
      buttonHandle1={handleSectionButtons} />)

  async function handleSectionButtons(val) {
    let finall = null;
    finall = initialValues.current.currentSection + val;

    if (finall >= 1 && finall <= initialValues.current.lastSection) {

      initialValues.current.currentSection = finall;

      sethighLightNav(initialValues.current.currentSection);

      await animationSwitch.current.off();

      flushSync(() => {
        setsectionArr(initialValues.current.allSectionsArr[
          initialValues.current.currentSection
        ]);
      })
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      await animationSwitch.current.on();

    }
    console.log(initialValues.current.currentSection);
  }

  function setOn(params) {
    animationSwitch.current.on = params;
  }
  function setOff(params) {
    animationSwitch.current.off = params;
  }

  useEffect(() => {
    animationSwitch.current.on();

  }, [])
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
          <NavShow howMuch={3} highLight={highLightNav} ></NavShow>
        </div>

        <div className="flex flex-row 
         justify-center w-full  ">
          {sectionArr}
        </div>



      </div>
    </>
  );
}

export { CreatePost }
