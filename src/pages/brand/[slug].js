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
import { information, overview } from "./data";

export default function Brand({ phoneList, categoryInfo, totalPage }) {
  const Router = useRouter();
  const { query } = Router;
  const { Panel } = Collapse;
  const page = query.page || 1;

  const [infoIDs, setInfoIDs] = useState([]);
  const [overviewIDs, setOverviewIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState(null);

  const [rangeValue, setRangeValue] = useState([0, 200000]);
  const [isRangeValueChange, setIsRangeValueChange] = useState(false);

  console.log(rangeValue);
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
        <div className="col-span-9  ">
          <div className="mb-2  bg-white rounded-[4px] shadow-sm capitalize  mx-3 md:mx-12 flex justify-between items-center px-3 ">
            <h2 className="text-[16px] font-bold  text-gray-700  p-3 ">
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
