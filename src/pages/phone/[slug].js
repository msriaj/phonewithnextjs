import {
  AndroidFilled,
  AppstoreFilled,
  CalendarFilled,
  CameraFilled,
  DatabaseFilled,
  HddFilled,
  MobileFilled,
  TabletFilled,
  ThunderboltFilled,
} from "@ant-design/icons";
import Image from "next/image";

import { API, APP_NAME } from "@/config";

import { Breadcrumb, Spin } from "antd";
import { NextSeo, ProductJsonLd } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Phone({ data }) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <div className="grid place-items-center h-screen">
        <Spin size="large" />
      </div>
    );

  const icons = {
    released: <CalendarFilled />,
    body: <MobileFilled />,
    camerapixels: <CameraFilled />,
    ramsize: <DatabaseFilled />,
    batsize: <ThunderboltFilled />,
    storage: <HddFilled />,
    processor: <AppstoreFilled />,
    os: <AndroidFilled />,
    displaysize: <TabletFilled />,
  };

  return (
    <>
      {/* <meta
        title="keywords"
        content={`${data.deviceName} Price in Bangladesh, ${data.deviceName} Full Specs & Review, ${data.deviceName} Technical Specifications, ${data.deviceName} Dimensions, ${data.deviceName} Display Features, ${data.deviceName} Camera Details, ${data.deviceName} Battery Life, ${data.deviceName} Processor Specs, ${data.deviceName} Storage Capacity, ${data.deviceName} RAM Capacity, ${data.deviceName} Connectivity Options, ${data.deviceName} Operating System, ${data.deviceName} User Interface, ${data.deviceName} User Experience, ${data.deviceName} Review, ${data.deviceName} Comparison, ${data.deviceName} Ratings, ${data.deviceName} User Ratings, ${data.deviceName} Expert Opinion, ${data.deviceName} User Feedback, ${data.deviceName} Mobile Technology, ${data.deviceName} Smartphone Features, ${data.deviceName} Mobile Device Features, ${data.deviceName} Mobile Phone Details, ${data.deviceName} Mobile Phone Specs, ${data.deviceName} Mobile Phone Review, ${data.deviceName} Mobile Phone Comparison, ${data.deviceName} Mobile Phone Ratings, Price of ${data.deviceName} in Bangladesh`}
      /> */}

      <NextSeo
        title={`${data.deviceName} Price in Bangladesh 2023 | Full Specs, Review & Comparison | ${APP_NAME}`}
        description={`${data.deviceName} - Full phone specifications and details, including official and unofficial BD price, expert rating, customer reviews, and comparisons. Check out ${data.deviceName} Price in Bangladesh 2023 and see why it's one of the top phones in the market.`}
        canonical={"https://www.url.ie/a"}
        openGraph={{
          url: "https://www.url.ie/a",
          title: `${data.deviceName} Price in Bangladesh 2023 | Full Specs, Review & Comparison | ${APP_NAME}`,
          description: `${data.deviceName} - Full phone specifications and details, including official and unofficial BD price, expert rating, customer reviews, and comparisons. Check out ${data.deviceName} Price in Bangladesh 2023 and see why it's one of the top phones in the market.`,
          images: [
            {
              url: `https://res.cloudinary.com/dpny6m6gz/image/upload/${data.images[0]}`,
              width: 800,
              height: 600,
              alt: data.deviceName,
              type: "image/jpeg",
            },
          ],
        }}
      />

      <ProductJsonLd
        productName={`${data.deviceName} Price in Bangladesh 2023 | Full Specs, Review & Comparison | ${APP_NAME}`}
        images={[
          `https://res.cloudinary.com/dpny6m6gz/image/upload/${data.images[0]}`,
        ]}
        description={`${data.deviceName} - Full phone specifications and details, including official and unofficial BD price, expert rating, customer reviews, and comparisons. Check out ${data.deviceName} Price in Bangladesh 2023 and see why it's one of the top phones in the market.`}
        brand={data.categoryInfo.brandName}
        color="blue"
        manufacturerName={data.categoryInfo.brandName}
        slogan={data.details}
        disambiguatingDescription={`${data.deviceName} - Full phone specifications and details, including official and unofficial BD price, expert rating, customer reviews, and comparisons. Check out ${data.deviceName} Price in Bangladesh 2023 and see why it's one of the top phones in the market. ${data.details}`}
        releaseDate={data.createdAt}
        productionDate={data.createdAt}
        offers={[
          {
            price: data.prices[0].BDT,
            priceCurrency: "BDT",
            priceValidUntil: data.createdAt,
            availability: "https://schema.org/InStock",
            seller: {
              name: data.categoryInfo.brandName,
            },
          },
        ]}
      />

      <div className="pt-4">
        <div className="p-4 mx-4 mb-5 bg-white rounded-[4px]">
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <>Home</>,
              },
              {
                href: `/brand/${data.categoryInfo._id}`,
                title: (
                  <>
                    <span> {data.categoryInfo.brandName}</span>
                  </>
                ),
              },
              {
                title: data.deviceName,
              },
            ]}
          />
        </div>
        <div className="px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-white p-[10px] md:p-[20px] rounded-[4px] shadow-sm  flex-col md:flex-row  gap-12">
            <div className="col-span-5 flex  h-full justify-center items-center text-center">
              <div className="gird  place-items-center">
                <Image
                  src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${data.images[0]}`}
                  alt={data.deviceName}
                  width={300}
                  height={300}
                />
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-[22px] font-medium text-[#3749bb] mb-4">
                {data.deviceName}
              </h1>
              <div className=" items-center mb-4">
                {data.prices.map((price, idx) => (
                  <span
                    key={idx}
                    className="text-[12px] px-[6px] py-[4px] text-[#666666] rounded-[30px] bg-[rgba(55,73,187,.05)] mr-4"
                  >
                    {Object.keys(price)[0]}:
                    <b className="text-[14px] text-[#000000]">
                      {" "}
                      {Object.values(price)[0]} TK
                    </b>
                  </span>
                ))}
              </div>
              <div className="my-4">
                <p className="text-gray-700">{data.details} </p>
              </div>
              <h2 className="text-[18px] my-[16px]">Key Features</h2>
              {data.overview.map((key, idx) => (
                <div
                  key={idx}
                  className="flex bg-[#091621a9] md:w-[70%] hover:bg-[#091621] hover:cursor-pointer transition-colors duration-150 ease-in-out  mb-2 text-white items-center"
                >
                  <span className="p-5  grid place-items-center bg-[#091621]">
                    {icons[Object.keys(key)[0]]}
                  </span>
                  <span className="flex flex-col md:flex-row  p-3 md:gap-2 text-xs">
                    <b>
                      {" "}
                      {Object.keys(key)[0] == "ramsize" && "RAM"}{" "}
                      {Object.keys(key)[0] == "batsize" && "Battery"}{" "}
                      {Object.keys(key)[0] == "camerapixels" && "Camera"}{" "}
                      {Object.keys(key)[0] == "displaysize" && "Display"}{" "}
                      {Object.keys(key)[0] == "processor" && "Processor"}{" "}
                      {Object.keys(key)[0] == "storage" && "Storage"}{" "}
                      {Object.keys(key)[0] == "os" && "OS"}{" "}
                      {Object.keys(key)[0] == "body" && "Body"}{" "}
                      {Object.keys(key)[0] == "released" && "Released"}{" "}
                    </b>
                    <span>
                      {Object.values(key)}{" "}
                      {Object.keys(key)[0] == "ramsize" && "GB"}{" "}
                      {Object.keys(key)[0] == "batsize" && "mAh"}{" "}
                      {Object.keys(key)[0] == "camerapixels" && "MP"}{" "}
                      {Object.keys(key)[0] == "displaysize" && "Inch"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-7">
            <div className="md:col-span-5">
              {data?.review && (
                <div className=" bg-white p-[5px] md:p-[20px] rounded-[4px] shadow-sm mb-5">
                  {data?.review && (
                    <div className="mb-5 overflow-hidden">
                      <h2 className="font-bold text-[20px] mb-[20px]">
                        Review
                      </h2>
                      <div>
                        <div className="border-b border-[#ecedef] text-[14px]   last-child():border-0 px-[5px] md:px-[20px] py-[10px] grid grid-cols-1  ">
                          <p className="whitespace-pre-line text-[#666666] mr-4">
                            {data.review}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.pros && (
                    <div className="mb-5 overflow-hidden">
                      <h2 className="text-[16px] font-bold rounded-[5px] text-[#3749bb] px-4 py-2  bg-[#F5F6FB] ">
                        Pros
                      </h2>
                      <div>
                        <div className="border-b border-[#ecedef] text-[14px]   last-child():border-0 px-[5px] md:px-[20px] py-[10px] grid grid-cols-1  ">
                          <p className="whitespace-pre-line text-[#666666] mr-4">
                            {data.pros}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {data?.cons && (
                    <div className="mb-5 overflow-hidden">
                      <h2 className="text-[16px] font-bold rounded-[5px] text-[#3749bb] px-4 py-2  bg-[#F5F6FB] ">
                        Cons
                      </h2>
                      <div>
                        <div className="border-b border-[#ecedef] text-[14px]   last-child():border-0 px-[5px] md:px-[20px] py-[10px] grid grid-cols-1  ">
                          <p className="whitespace-pre-line text-[#666666] mr-4">
                            {data.cons}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className=" bg-white p-[5px] md:p-[20px] rounded-[4px] shadow-sm">
                <h2 className="font-bold text-[20px] mb-[20px]">
                  Specification
                </h2>
                {data.information.map(
                  (info, idx) =>
                    Object.keys(info)[0] && (
                      <>
                        <div className="mb-5 overflow-hidden" key={idx}>
                          <h2 className="text-[16px] font-bold rounded-[5px] text-[#3749bb] px-4 py-2  bg-[#F5F6FB] ">
                            {Object.keys(info)[0]}
                          </h2>
                          <div>
                            {Object.values(info)[0].map(
                              (option, idx) =>
                                Object.values(option)[0] && (
                                  <div
                                    key={idx}
                                    className="border-b border-[#ecedef] text-[14px] hover:bg-[#FAFBFC] last-child():border-0 px-[20px] py-[10px] grid grid-cols-1 md:grid-cols-4 "
                                  >
                                    <span className=" text-[#666666] mr-4">
                                      {Object.keys(option)[0]}
                                    </span>
                                    <span className="col-span-3">
                                      {Object.values(option)[0]}{" "}
                                    </span>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      </>
                    )
                )}
              </div>
            </div>
            <div className="md:col-span-2 rounded-[4px] shadow-sm">
              <h1 className="bg-[#3749bb] text-white text-[16px] font-bold p-[20px] rounded-[4px] mb-[20px]">
                <b>Related Phones</b>
              </h1>
              {data.relatedPhones.map((phone, idx) => (
                <div key={idx} className=" bg-white p-[20px] mb-4">
                  <Link href={`/phone/${phone._id}`}>
                    <div className="flex items-center gap-4">
                      <Image
                        src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${phone.images[0]}`}
                        alt={phone.deviceName}
                        width={100}
                        height={100}
                      />
                      <div>
                        <h2 className="text-[16px] font-bold">
                          {phone.deviceName}
                        </h2>
                        <p className="text-[14px] text-gray-600" title="price">
                          {Object.values(phone.prices[0])[0]}
                          {"TK"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API}/phone-details/${params.slug}`);
  const data = await res.json();

  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/home?page=1&limit=20`);
  const { latestPhones } = await res.json();

  const paths = latestPhones.map((phone) => ({ params: { slug: phone._id } }));

  return {
    paths,
    fallback: true,
  };
}
