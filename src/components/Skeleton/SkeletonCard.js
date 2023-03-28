import { Skeleton } from "antd";

const SkeletonCard = () => {
  return (
    <>
      <div
        className="flex bg-white
         justify-center
      flex-col gap-3 text-center items-center p-7 rounded-[4px] shadow-sm"
      >
        <Skeleton.Image active={true} />
        <Skeleton paragraph={{ rows: 2 }} title={false} active={true} />
      </div>
    </>
  );
};

export default SkeletonCard;
