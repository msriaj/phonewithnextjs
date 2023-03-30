import {
  AndroidFilled,
  AppstoreFilled,
  CalendarFilled,
  CameraFilled,
  DatabaseFilled,
  HddFilled,
  HomeOutlined,
  MobileFilled,
  TabletFilled,
  ThunderboltFilled,
} from "@ant-design/icons";
import Head from "next/head";
import Image from "next/image";

import { API } from "@/config";

import { Breadcrumb } from "antd";
import Link from "next/link";

export default function Phone({ data }) {
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
      <Head>
        <title>{data.deviceName}</title>
      </Head>
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
            <div className="col-span-5 flex justify-center text-center">
              {/* <ProductSlider imageUrls={data.images} /> */}

              <Image
                src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${data.images[0]}`}
                alt={data.deviceName}
                width={300}
                height={300}
              />
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
                  <span className="p-4  grid place-items-center bg-[#091621]">
                    {icons[Object.keys(key)[0]]}
                  </span>
                  <b className="p-3 text-xs">
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
                  <span className="text-xs p-3">
                    {Object.values(key)}{" "}
                    {Object.keys(key)[0] == "ramsize" && "GB"}{" "}
                    {Object.keys(key)[0] == "batsize" && "mAh"}{" "}
                    {Object.keys(key)[0] == "camerapixels" && "MP"}{" "}
                    {Object.keys(key)[0] == "displaysize" && "Inch"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-7">
            <div className="md:col-span-5 bg-white p-[10px] md:p-[20px] rounded-[4px] shadow-sm">
              <h2 className="font-bold text-[20px] mb-[20px]">Specification</h2>
              {data.information.map((info, idx) => (
                <div className="mb-5 overflow-hidden" key={idx}>
                  <h2 className="text-[16px] font-bold rounded-[5px] text-[#3749bb] px-4 py-2  bg-[#F5F6FB] ">
                    {Object.keys(info)[0]}
                  </h2>
                  <div>
                    {Object.values(info)[0].map((option, idx) => (
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
                    ))}
                  </div>
                </div>
              ))}
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

export async function getServerSideProps({ params }) {
  // Fetch data from the API based on the slug parameter
  const res = await fetch(`${API}/phone-details/${params.slug}`);
  const data = await res.json();

  return {
    props: { data },
  };
}
