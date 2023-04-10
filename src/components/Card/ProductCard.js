import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ phone, key }) => {
  return (
    <div>
      <Link
        href={{
          pathname: `/phone/[slug]`,
          query: { slug: phone?.slug },
        }}
        key={key}
      >
        <div className="bg-white rounded-[4px]  shadow-sm hover:shadow   p-4">
          <div className=" flex justify-center">
            <Image
              src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${phone.images[0]}`}
              width={100}
              height={200}
              alt={phone.deviceName}
            />
          </div>
          <h1 className="mt-4 text-[14px] text-center font-medium text-gray-800">
            {phone.deviceName}
          </h1>
          {/* <p className="text-gray-600 text-xs max-h-[200px] overflow-hidden hover:text-gray-800 transition-colors">{phone.details}</p> */}
          <p className="text-orange-600 text-center font-semibold">
            {" "}
            {typeof phone?.prices[0].BDT === "number"
              ? phone?.prices[0].BDT.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                ) + " TK"
              : phone?.prices[0].BDT}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
