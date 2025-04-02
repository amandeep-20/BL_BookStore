import React from 'react';

const Shimmer = () => {
  return (
    <div 
      className="h-[275px] w-[235px] border border-[#E2E2E2] rounded-[3px] overflow-hidden max-[500px]:w-[175px]"
      data-testid="shimmer-card"
    >
      {/* Book Cover Placeholder */}
      <div 
        className="h-[171px] w-full bg-[#F5F5F5] flex justify-center items-center animate-pulse"
        data-testid="cover-placeholder"
      >
        <div 
          className="h-[135px] w-[105px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate"
          data-testid="shimmer-placeholder"
        />
      </div>
      {/* Details Placeholder */}
      <div 
        className="h-[102px] w-full pl-[10px] pt-[10px] flex flex-col gap-[5px]"
        data-testid="details-placeholder"
      >
        {/* Title Placeholder */}
        <div 
          className="h-[14px] w-[80%] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]"
          data-testid="shimmer-placeholder"
        />
        {/* Author Placeholder */}
        <div 
          className="h-[10px] w-[60%] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]"
          data-testid="shimmer-placeholder"
        />
        {/* Rating Row Placeholder */}
        <div className="flex gap-[5px] items-center">
          <div 
            className="w-[33px] h-[16px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[1px]"
            data-testid="shimmer-placeholder"
          />
          <div 
            className="w-[40px] h-[10px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]"
            data-testid="shimmer-placeholder"
          />
        </div>
        {/* Price Row Placeholder */}
        <div className="flex items-center gap-[5px]">
          <div 
            className="w-[50px] h-[12px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]"
            data-testid="shimmer-placeholder"
          />
          <div 
            className="w-[40px] h-[10px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]"
            data-testid="shimmer-placeholder"
          />
        </div>
      </div>
    </div>
  );
};

export default Shimmer;