import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const CourseCard = ({
  courseTitle ,
  coursethumbnail,
  courseprice,
  challengesCompleted ,
  totalChallenges ,
  onContinue,
}) => {
  const progress = (challengesCompleted / totalChallenges) * 100;

  return (
    <div className="h-52 w-full border-2 flex rounded-xl">
    <div className="bg-white h-full w-96"><img src={coursethumbnail } className="h-full w-full bg-cover"></img></div>
    <div className=" h-full w-full ml-3">
         <div className="font-bold text-xl ">{courseTitle}</div>
         <div className="flex items-center text-base font-bold">
      <FaRupeeSign className="mr-1" />
      {courseprice}
    </div>
    </div>
   
    </div>
  );
};

export default CourseCard;
