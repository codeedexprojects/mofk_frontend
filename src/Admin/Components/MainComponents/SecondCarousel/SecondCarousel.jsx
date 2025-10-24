import React from 'react'
import { useState } from 'react'
import CreateSecondCarousel from './CreateSecondCarousel';
import EditSecondCarousel from './EditSecondCarousel';
import SearchSecondCarousel from './SearchSecondCarousel';
import AddedSecondCarousel from './AddedSecondCarousel';

const SecondCarousel = () => {
  const [createEditCarousel, setCreateEditCarousel] = useState("createcarousel");
  const [initialEditCarouselData, setInitialEditCarouselData] = useState(null)
  const [adminCarousel, setAdminCarousel] = useState([]);

  const handleEditCarousel = (crsl) => {
    setInitialEditCarouselData(crsl)
    setCreateEditCarousel('editcarousel')
    console.log(crsl);

  }

  // console.log(adminCarousel);


  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Carousel</h1>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mt-5">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <div className="h-fit overflow-y-auto hide-scrollbar">
            {createEditCarousel === "createcarousel" ? (
              <CreateSecondCarousel
                setAdminCarousel={setAdminCarousel}
              />
            ) : (
              <EditSecondCarousel
                initialEditCarouselData={initialEditCarouselData}
                setAdminCarousel={setAdminCarousel}
              />
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-4 space-y-5">
          <SearchSecondCarousel
            setAdminCarousel={setAdminCarousel}
          />

          {/* Added Carousel */}
          <div className="space-y-10 overflow-y-auto hide-scrollbar">
            <AddedSecondCarousel
              createEditCarousel={createEditCarousel}
              handleEditCarousel={handleEditCarousel}
              adminCarousel={adminCarousel}
              setAdminCarousel={setAdminCarousel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondCarousel;

