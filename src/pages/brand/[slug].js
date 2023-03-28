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
import { useState } from "react";

export default function Brand({ phoneList, categoryInfo, totalPage }) {
  const Router = useRouter();
  const { query } = Router;
  const { Panel } = Collapse;
  const page = query.page || 1;

  const [infoIDs, setInfoIDs] = useState([]);
  const [overviewIDs, setOverviewIDs] = useState([]);

  const infoIDHandaler = (value) => {
    if (infoIDs.includes(value)) {
      setInfoIDs(infoIDs.filter((id) => id !== value));
    } else {
      setInfoIDs([...infoIDs, value]);
    }
  };
  const overviewIDHandaler = (value) => {
    if (overviewIDs.includes(value)) {
      setOverviewIDs(overviewIDs.filter((id) => id !== value));
    } else {
      setOverviewIDs([...overviewIDs, value]);
    }
  };

  if (infoIDs.length > 0 || overviewIDs.length > 0) {
    Router.push({
      pathname: Router.pathname,
      query: {
        ...query,
        information: infoIDs.join(","),
        overview: overviewIDs.join(","),
      },
    });
  }
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
          {Object.keys(information).map((key) => (
            <div
              key={information[key]}
              className="bg-white rounded-[4px] shadow-sm"
            >
              <Collapse expandIconPosition={"end"} bordered={false}>
                <Panel header={key} key="1">
                  {information[key].map((option) => (
                    <div
                      className="flex p-2 hover:bg-gray-100"
                      key={Object.values(option)[0]}
                    >
                      <Checkbox
                        name="information"
                        onChange={(e) => infoIDHandaler(e.target.value)}
                        value={Object.keys(option)[0]}
                      >
                        {Object.values(option)[0]}
                      </Checkbox>
                    </div>
                  ))}
                </Panel>
              </Collapse>
            </div>
          ))}
          {Object.keys(overview).map((key) => (
            <div
              key={overview[key]}
              className="bg-white rounded-[4px] shadow-sm"
            >
              <Collapse expandIconPosition={"end"} bordered={false}>
                <Panel header={key} key="1">
                  {overview[key].map((option) => (
                    <div
                      className="flex p-2 hover:bg-gray-100"
                      key={Object.values(option)[0]}
                    >
                      <Checkbox
                        name="overview"
                        onChange={(e) => overviewIDHandaler(e.target.value)}
                        value={Object.keys(option)[0]}
                      >
                        {Object.values(option)[0]}
                      </Checkbox>
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
                total={totalPage * 20}
                pageSize={20}
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

const information = {
  "Display Size": [
    { 2001: "5.5 inch" },
    { 2002: "5.6 inch" },
    { 2003: "5.7 inch" },
    { 2004: "5.8 inch" },
    { 2005: "5.9 inch" },
    { 2006: "6.0 inch" },
    { 2007: "6.1 inch" },
    { 2008: "6.2 inch" },
    { 2009: "6.3 inch" },
    { 2010: "6.4 inch" },
    { 2011: "6.5 inch" },
    { 2012: "6.6 inch" },
    { 2013: "6.7 inch" },
    { 2014: "6.8 inch" },
    { 2015: "6.9 inch" },
  ],
  "Display Resolution": [
    { 1001: "720 x 1280" },
    { 1002: "1080 x 1920" },
    { 1003: "1440 x 2560" },
    { 1004: "2160 x 3840" },
  ],
  "Display Type": [
    { 3001: "IPS LCD" },
    { 3002: "AMOLED" },
    { 3003: "OLED" },
    { 3004: "Super AMOLED" },
    { 3005: "Super AMOLED Plus" },
  ],
  Chipset: [
    { 4001: "Exynos" },
    { 4002: "Snapdragon" },
    { 4003: "Kirin" },
    { 4004: "MediaTek" },
    { 4005: "Apple A" },
    { 4006: "Qualcomm" },
    { 4007: "HiSilicon" },
    { 4008: "Spreadtrum" },
    { 4009: "Rockchip" },
    { 4010: "Nvidia" },
    { 4011: "Intel" },
  ],
  OS: [
    {
      5001: "Android",
    },
    {
      5002: "iOS",
    },
    {
      5003: "Windows",
    },
    {
      5004: "BlackBerry",
    },
  ],
  Storage: [
    { 100002: "16GB" },
    { 100003: "32GB" },
    { 100004: "64GB" },
    { 100005: "128GB" },
    { 100006: "256GB" },
    { 100007: "512GB" },
    { 100008: "1TB" },
  ],

  Features: [
    { 8001: "Accelerometer" },
    { 8002: "Ambient light sensor" },
    { 8003: "Barometer" },
    { 8004: "Compass" },
    { 8005: "Fingerprint (front-mounted)" },
    { 8006: "Fingerprint (rear-mounted)" },
    { 8007: "Gyroscope" },
    { 8008: "Heart rate" },
    { 8009: "Proximity sensor" },
    { 8010: "SpO2" },
    { 8011: "Temperature sensor" },
    { 8012: "USB OTG" },
    { 8013: "Face ID" },
    { 8014: "NFC" },
    { 8015: "Wireless charging" },
    { 8016: "Fast charging" },
    { 8017: "Qi wireless charging" },
    { 8018: "Reverse wireless charging" },
    { 8019: "Fast wireless charging" },
  ],
};

const overview = {
  "RAM Size": [
    { 6003: "2GB" },
    { 6005: "3GB" },
    { 6007: "4GB" },
    { 6009: "6GB" },
    { 6011: "8GB" },
    { 6013: "12GB" },
    { 6015: "16GB" },
  ],
  Camera: [
    { 7001: "8MP" },
    { 7002: "12MP" },
    { 7003: "16MP" },
    { 7004: "20MP" },
    { 7005: "24MP" },
    { 7006: "32MP" },
    { 7007: "48MP" },
    { 7008: "64MP" },
    { 7009: "108MP" },
  ],

  "Battery Capacity": [
    { 9001: "1000mAh" },
    { 9002: "1500mAh" },
    { 9003: "2000mAh" },
    { 9004: "2500mAh" },
    { 9005: "3000mAh" },
    { 9006: "3500mAh" },
    { 9007: "4000mAh" },
    { 9008: "4500mAh" },
    { 9009: "5000mAh" },
    { 9010: "5500mAh" },
    { 9011: "6000mAh" },
  ],
};
