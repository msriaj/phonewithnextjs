import { API } from "@/config";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";

const index = ({ data }) => {
  return (
    <>
      <NextSeo title="All Category" description="All Category" />

      <div className="text-center">
        <h2 className="text-[20px] pt-[25px] mb-1.5 font-bold">All Category</h2>
        <p className="text-[16px] mb-[25px]     text-[#01132d]">
          Get Your Desired Product from Categories!
        </p>
      </div>

      <div className="  p-3    pt-3 md:pt-3">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-5 p-3  md:p-12 pt-3 md:pt-3 ">
          {data.map((category) => (
            <div key={category._id}>
              <Link href={`/brand/${category.slug}`}>
                <div className="bg-white rounded-[4px] shadow-sm  ">
                  <div className="flex justify-center items-center p-3">
                    {category.brandImageID ? (
                      <Image
                        src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${category.brandImageID}`}
                        width={100}
                        height={200}
                        alt={category.brandName}
                        className="object-contain transition-all duration-300 hover:scale-125
                      "
                      />
                    ) : (
                      <Image
                        src={`https://res.cloudinary.com/dpny6m6gz/image/upload/v1680904455/No_Image_Available_j0tovp.jpg`}
                        width={100}
                        height={200}
                        alt={category.brandName}
                        className="object-contain transition-all duration-300 hover:scale-125
                        "
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <h2 className="text-[16px] text-center font-bold  text-gray-700  ">
                      {category.brandName}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const res = await fetch(`${API}/brand`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
