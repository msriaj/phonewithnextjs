import ProductCard from "@/components/Card/ProductCard";
import { API, APP_NAME } from "@/config";
import { Button, Input, Pagination, Select, Spin } from "antd";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const { Search } = Input;

export default function Home({ latestPhones, total, featuredCategories, allCats }) {
  const Router = useRouter();
  const { query } = Router;
  const page = query.page || 1;


  if (Router.isFallback)
    return (
      <div className="grid place-items-center h-screen">
        <Spin size="large" />
      </div>
    );
  return (
    <>
      <NextSeo
        title={`${APP_NAME} - Find Your Dream Phone`}
        description={`${APP_NAME} - Find Your Dream Phone`}
      />
      <main>
        <div className="py-10 px-3">

          <div className="text-center">
            <h2 className="text-[20px] pt-[25px] mb-1.5 font-bold">
              Featured Category
            </h2>
            <p className="text-[16px] mb-[25px]     text-[#01132d]">
              {" "}
              Get Your Desired Product from Featured Category!
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-5 p-3  md:p-12 pt-3 md:pt-3 ">
            {featuredCategories.map((category) => (
              <div key={category._id}>
                <Link href={`/brand/${category.slug}`}>
                  <div className="bg-white rounded-[4px] shadow-sm  ">
                    <div className="flex justify-center items-center p-3">
                      <Image
                        src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${category.brandImageID}`}
                        width={100}
                        height={200}
                        alt={category.brandName}
                        className="object-contain transition-all duration-300 hover:scale-125
                      "
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/* see all brand button */}
          <div className="text-center mb-16">
            <Link href="/brand">

              <button className="bg-[#db2d1a] text-white font-bold py-2 px-4 rounded-full">
                See All Brands
              </button>
            </Link>
          </div>
          <div className="mb-2  bg-white rounded-[4px] shadow-sm  mx-3 md:mx-12 flex justify-between items-center px-3 ">
            <h2 className="text-[16px] font-bold  text-gray-700  p-3 ">
              Latest Phones
            </h2>

          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 p-3  md:p-12 pt-3 md:pt-3 ">
            {latestPhones.map((phone) => (
              <ProductCard key={phone.id} phone={phone} />
            ))}
          </div>
          <div className=" p-3  md:p-12 pt-3 md:pt-3  rounded-[4px]  ">
            <div className="flex justify-center p-[20px] bg-white shadow-sm rounded-[4px]">
              <Pagination
                defaultCurrent={page}
                onChange={(number) => {
                  Router.push(`/${number}`);
                }}
                total={total}
                pageSize={28}
              />{" "}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ query }) {
  const res = await fetch(`${API}/home`);
  const { featuredCategories, allCats, latestPhones, total } = await res.json();

  return {
    props: {
      latestPhones,
      total,
      featuredCategories,

    },
    revalidate: 10,
  };
}
