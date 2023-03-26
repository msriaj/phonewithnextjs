import { API } from "@/config";
import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Checkbox,
  Col,
  Collapse,
  InputNumber,
  Pagination,
  Row,
  Select,
  Slider,
} from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Brand({ phoneList, categoryInfo, totalPage }) {
  const Router = useRouter();
  const { query } = Router;
  const { Panel } = Collapse;
  const page = query.page || 1;

  return (
    <>
      <Head>
        <title>{categoryInfo.brandName}</title>
      </Head>
      <div className="pt-4">
        <div className="p-4 mx-3 mb-5 bg-white rounded-[4px]">
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: (
                  <>
                    <span>
                      {" "}
                      <h3>{categoryInfo.brandName}</h3>
                    </span>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-12">
        <div className="hidden md:col-span-3 rounded-[4px]  shadow-sm  md:flex flex-col gap-3 p-3  ">
          <div className="bg-white rounded-[4px] shadow-sm">
            <Collapse bordered={false} expandIconPosition={"end"} activeKey="1">
              <Panel header="Price Range" key="1">
                <Slider
                  range={{
                    draggableTrack: true,
                  }}
                  defaultValue={[20, 50]}
                />
                <Row>
                  <Col span={12}>
                    <InputNumber
                      min={1}
                      max={20}
                      style={{
                        margin: "0 16px",
                      }}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      max={20}
                      style={{
                        margin: "0 16px",
                      }}
                    />
                  </Col>
                </Row>
              </Panel>
            </Collapse>{" "}
          </div>
          {Object.keys(filterOptions).map((key) => (
            <div key={key} className="bg-white rounded-[4px] shadow-sm">
              <Collapse expandIconPosition={"end"} bordered={false}>
                <Panel header={key} key="1">
                  {filterOptions[key].map((option) => (
                    <div className="flex mb-2" key={option}>
                      <Checkbox>{option}</Checkbox>
                    </div>
                  ))}
                </Panel>
              </Collapse>
            </div>
          ))}
        </div>
        <div className="col-span-9  ">
          <div className="mb-2  bg-white rounded-[4px] shadow-sm capitalize  mx-3 md:mx-12 flex justify-between items-center px-3 ">
            <h2 className="text-[16px] font-bold  text-gray-700  p-3 ">
              {categoryInfo.brandName}
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
            {phoneList.map((phone) => (
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
                    pathname: `/brand/${categoryInfo._id}`,
                    query: { page: number },
                  });
                }}
                total={totalPage * 28}
                pageSize={28}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params, query }) {
  // Fetch data from the API based on the slug parameter
  const res = await fetch(`${API}/brand/${params.slug}?page=${query.page}`);
  const { phoneList, categoryInfo, totalPage } = await res.json();

  // Pass data to the page component as props
  return {
    props: { phoneList, categoryInfo, totalPage },
  };
}

const filterOptions = {
  Brands: [
    "Apple",
    "Samsung",
    "One Plus",
    "Realme",
    "Redmi",
    "Vivo",
    "Oppo",
    "Nokia",
    "Honor",
    "Asus",
    "Lenovo",
  ],
  Availability: ["In Stock", "Out of Stock", "Up Coming"],
  "Display Size": ["5.5", "5.7", "5.8", "6.0", "6.1", "6.2", "6.3", "6.4"],
  "Display Resolution": ["720 x 1280", "1080 x 1920", "1440 x 2560"],
  "Display Type": ["IPS LCD", "AMOLED", "OLED"],
  "Display Protection": ["Corning Gorilla Glass", "Asahi Dragontrail Glass"],
  OS: ["Android", "iOS"],
  Processor: ["Qualcomm Snapdragon", "Apple A", "MediaTek", "Exynos"],
  Ram: ["2 GB", "3 GB", "4 GB", "6 GB", "8 GB"],
  "Internal Storage": ["16 GB", "32 GB", "64 GB", "128 GB", "256 GB", "512 GB"],
  "Primary Camera": ["8 MP", "12 MP", "16 MP", "20 MP", "24 MP", "32 MP"],
  Features: [
    "3G",
    "4G",
    "5G",
    "Dual SIM",
    "Fingerprint Sensor",
    "Face Unlock",
    "NFC",
    "USB Type-C",
    "Wireless Charging",
    "Fast Charging",
    "Water Resistant",
    "Dust Resistant",
    "IP68",
    "IP69",
    "IP69K",
    "IP68",
    "IP69",
    "IP69K",
  ],
};
