import { LucideIcon } from 'lucide-react';
import React from 'react';

interface IStatDetails {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
}

interface IStatCardProps {
  title: string;
  primaryIcon: JSX.Element;
  details: IStatDetails[];
  dateRange: string;
}

export const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: IStatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? '+' : '';
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) => {
    return value >= 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {/* header */}
      <div>
        <div className="flex-between mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700 whitespace-nowrap basis-1/2 overflow-hidden text-ellipsis">
            {title}
          </h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr />
      </div>

      {/* body */}
      <div className="flex items-center justify-around mb-6 gap-4 px-5">
        <div className=" rounded-full p-5 bg-blue-50 border-sky-300 border">
          {primaryIcon}
        </div>

        <div className="flex-1">
          {details.map((detail, idx) => (
            <React.Fragment key={detail.title}>
              <div className="flex-between my-4">
                <span className="text-gray-500 basis-1/3 ">{detail.title}</span>
                <span className="font-bold text-gray-800">{detail.amount}</span>
                <div className="flex items-center">
                  <detail.IconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />
                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {idx < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
