import ProductCard from "@/components/Card/ProductCard";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Brand({ phoneList, categoryInfo, totalPage }) {
  const Router = useRouter();
  const { query } = Router;
  const { Panel } = Collapse;
  const page = query.page || 1;

  const [infoIDs, setInfoIDs] = useState([]);
  const [overviewIDs, setOverviewIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState(null);

  const [showFilter, setShowFilter] = useState(false);

  const [rangeValue, setRangeValue] = useState([0, 200000]);
  const [isRangeValueChange, setIsRangeValueChange] = useState(false);

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

  const handleRange = (value) => {
    setIsRangeValueChange(true);
    setRangeValue(value);
  };

  const handleInputRange = (value, index) => {
    setIsRangeValueChange(true);
    setRangeValue((prev) => [value, prev[index]]);
  };

  useEffect(() => {
    const start = () => {
      console.log("start");
      setIsLoading(true);
    };

    const end = () => {
      console.log("finished");
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Router.isReady]);

  useEffect(() => {
    if (infoIDs.length > 0 && overviewIDs.length > 0) {
      Router.push({
        pathname: Router.pathname,
        query: {
          ...query,
          information: infoIDs.join(","),
          overview: overviewIDs.join(","),
        },
      });
    }

    if (infoIDs.length > 0) {
      Router.push({
        pathname: Router.pathname,
        query: {
          ...query,
          information: infoIDs.join(","),
        },
      });
    }

    if (overviewIDs.length > 0) {
      Router.push({
        pathname: Router.pathname,
        query: {
          ...query,
          overview: overviewIDs.join(","),
        },
      });
    }

    if (infoIDs.length === 0 && overviewIDs.length === 0) {
      Router.push({
        pathname: `/brand/${categoryInfo._id}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoIDs, overviewIDs]);

  useEffect(() => {
    if (isRangeValueChange) {
      Router.push({
        pathname: Router.pathname,
        query: {
          ...query,
          range: rangeValue.join(","),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeValue]);

  useEffect(() => {
    if (sort) {
      Router.push({
        pathname: Router.pathname,
        query: {
          ...query,
          sort,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

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
                title: <>Home</>,
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
        <div
          className={`${
            showFilter
              ? "bg-white h-full overflow-y-auto z-10 fixed top-0 right-0"
              : "hidden"
          } md:static md:bg-transparent  md:h-auto  md:col-span-3 rounded-[4px]  shadow-sm  md:flex flex-col gap-3 p-3 `}
        >
          <div className="bg-white rounded-[4px] shadow-sm">
            <Collapse bordered={false} showArrow={false} activeKey="1">
              <Panel header="Price Range" key="1">
                <Slider
                  range={{
                    draggableTrack: true,
                  }}
                  defaultValue={rangeValue}
                  onChange={handleRange}
                  step={5000}
                  max={200000}
                />
                <Row>
                  <Col span={12}>
                    <InputNumber
                      value={rangeValue[0]}
                      style={{
                        margin: "0 16px",
                      }}
                      onChange={handleInputRange}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      value={rangeValue[1]}
                      style={{
                        margin: "0 16px",
                      }}
                      onChange={handleInputRange}
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
        <div className="col-span-9 ">
          <div className="mb-2  bg-white rounded-[4px] shadow-sm capitalize  mx-3 md:mx-12 flex justify-between items-center px-3 ">
            <div
              onClick={() => setShowFilter(!showFilter)}
              className="border cursor-pointer text-gray-700 px-4 rounded-[4px] my-2 flex md:hidden"
            >
              Filter
            </div>

            <h2 className="hidden md:flex text-[16px] font-bold  text-gray-700  p-3 ">
              {categoryInfo.brandName}
            </h2>
            <Select
              defaultValue="Latest"
              style={{ width: 120 }}
              onChange={(value) => {
                setSort(value);
              }}
              options={[
                { value: "Latest", label: "Latest" },
                { value: "toHigh", label: "Price: Low to High" },
                { value: "toLow", label: "Price: High to Low" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5   gap-5 p-3  md:p-12 pt-3 md:pt-3 ">
            {isLoading &&
              new Array(20).fill().map((id) => <SkeletonCard key={id} />)}

            {!isLoading &&
              phoneList.map((phone) => (
                <ProductCard key={phone._id} phone={phone} />
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
  const res = await fetch(
    `${API}/v2/brand/${params.slug}?page=${query.page}${
      query.information ? `&information=${query.information}` : ""
    }${query.overview ? `&overview=${query.overview}` : ""}${
      query.range ? "&range=" + query.range : ""
    }${query.sort ? `&sort=${query.sort}` : ""}`
  );

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

export const overview = {
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
