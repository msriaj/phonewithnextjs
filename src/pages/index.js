import { API, APP_NAME } from "@/config";
import { Pagination, Select } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({
  latestPhones,
  topCategories,
  total,
  categories,
  popularBrands,
}) {
  const Router = useRouter();
  const { query } = Router;
  const page = query.page || 1;

  return (
    <>
      <Head>
        <title>{APP_NAME} - Find Your Dream Phone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex md:hidden gap-5 py-3 overflow-x-auto max-w-7xl mx-auto    px-4 sm:px-6 lg:px-8">
          {topCategories.map((category) => (
            <div
              key={category._id}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded-full inline-flex items-center text-xs"
            >
              <Link href={`/brand/${category._id}`}>
                <h3>{category.brandName}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div className="grid md:pt-5 gap-5 md:grid-cols-12">
          <div className="col-span-9  ">
            {popularBrands.map((brand) => (
              <>
                <div className="mb-2  bg-white rounded-[4px] shadow-sm   mx-3 md:mx-12 flex justify-between items-center px-3 ">
                  <h2 className="text-[16px] font-bold  text-gray-700 capitalize  p-3 ">
                    {Object.keys(brand)[0]}
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5   gap-5 p-3  md:p-12 pt-3 md:pt-3 ">
                  {Object.values(brand)[0].map((phone) => (
                    <Link
                      key={phone.id}
                      href={{
                        pathname: `/phone/[slug]`,
                        query: { slug: phone?._id },
                      }}
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
                        <p className="text-[#ef4a23] text-center font-bold">
                          {" "}
                          {phone?.prices[0].BDT} TAKA
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ))}
            <div className="mb-2  bg-white rounded-[4px] shadow-sm  mx-3 md:mx-12 flex justify-between items-center px-3 ">
              <h2 className="text-[16px] font-bold  text-gray-700  p-3 ">
                Latest Phones
              </h2>
              <Select
                defaultValue="Latest"
                style={{ width: 120 }}
                onChange={() => {
                  console.log(11);
                }}
                options={[
                  { value: "Latest", label: "Latest" },
                  { value: "Price: Low to High", label: "Price: Low to High" },
                  { value: "Price: High to Low", label: "Price: High to Low" },
                ]}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5   gap-5 p-3  md:p-12 pt-3 md:pt-3 ">
              {latestPhones.map((phone) => (
                <Link
                  key={phone.id}
                  href={{
                    pathname: `/phone/[slug]`,
                    query: { slug: phone?._id },
                  }}
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
                    <p className="text-[#ef4a23] text-center font-bold">
                      {" "}
                      {phone?.prices[0].BDT} TAKA
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className=" p-3  md:p-12 pt-3 md:pt-3  rounded-[4px]  ">
              <div className="flex justify-center p-[20px] bg-white shadow-sm rounded-[4px]">
                <Pagination
                  defaultCurrent={page}
                  onChange={(number) => {
                    Router.push({
                      pathname: `/`,
                      query: { page: number },
                    });
                  }}
                  total={total}
                  pageSize={28}
                />{" "}
              </div>
            </div>
          </div>
          <div className="hidden md:col-span-3 rounded-[4px] bg-white    shadow-sm  md:flex flex-col gap-5 p-3    pt-3 md:pt-3">
            <h2 className="">
              <span className="text-[#ef4a23] font-bold px-1">Categories</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 font-bold text-center">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className=" border border-gray-200  hover:bg-gray-200 text-gray-800 py-1 px-3  cursor-pointer inline-flex items-center text-xs"
                >
                  <Link href={`/brand/${category._id}`}>
                    <h3 className="text-center">{category.brandName}</h3>
                  </Link>
                </div>
              ))}{" "}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const res = await fetch(`${API}/latest-phones?page=${query.page}`);
  const { latestPhones, total } = await res.json();
  const res2 = await fetch(`${API}/top-categories`);
  const topCategories = await res2.json();
  const res3 = await fetch(`${API}/categories`);
  const categories = await res3.json();
  const res4 = await fetch(`${API}/popular`);
  const popularBrands = await res4.json();
  return {
    props: {
      latestPhones,
      total,
      topCategories,
      categories,
      popularBrands,
    },
  };
}
