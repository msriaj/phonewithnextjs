import ProductCard from "@/components/Card/ProductCard";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { API } from "@/config";
import { information, overview } from "@/data/brand";
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

export default function Brand(props) {
  const Router = useRouter();
  const { Panel } = Collapse;

  const [phoneList, setPhoneList] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [totalPage, setTotalPage] = useState(0);

  const [infoIDs, setInfoIDs] = useState([]);
  const [overviewIDs, setOverviewIDs] = useState([]);
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [rangeValue, setRangeValue] = useState([0, 200000]);
  const [isRangeValueChange, setIsRangeValueChange] = useState(false);

  const pathQuery = Router.asPath.split("?")[1];

  const updateState = (value, setState) => {
    setIsFilterOn(true);
    setIsLoading(true);

    setState((prev) => {
      if (prev.includes(value)) return prev.filter((item) => item !== value);
      return [...prev, value];
    });
  };

  const handleRange = (value) => {
    setIsFilterOn(true);
    setIsLoading(true);
    setIsRangeValueChange(true);
    setRangeValue(value);
  };

  const handleInputRange = (value, index) => {
    setIsFilterOn(true);
    setIsLoading(true);
    setIsRangeValueChange(true);
    setRangeValue((prev) => [value, prev[index]]);
  };

  useEffect(() => {
    if (!isFilterOn) return;

    const informationIds = infoIDs.length
      ? "information=" + infoIDs.join()
      : "";
    const overviewIds = overviewIDs.length
      ? "overview=" + overviewIDs.join()
      : "";

    const ranges = isRangeValueChange ? `range=${rangeValue.join()}` : "";
    const sortValue = sort ? `sort=${sort}` : "";
    const pageNo = page > 1 ? `page=${page}` : "";

    const query = [informationIds, overviewIds, ranges, sortValue, pageNo]
      .filter((q) => q)
      .join("&");

    Router.push(`/brand/${props.categoryInfo.slug}?${query}`, undefined, {
      shallow: true,
    });

    fetchData(query).then((res) => {
      if (res) {
        setPhoneList(res.phoneList || []);
        setTotalPage(res.totalPage || 0);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isFilterOn,
    infoIDs,
    overviewIDs,
    rangeValue,
    isRangeValueChange,
    sort,
    page,
    pathQuery,
  ]);

  useEffect(() => {
    if (!pathQuery) return;
    if (pathQuery && isFilterOn) return;

    fetchData(pathQuery).then((res) => {
      if (res) {
        setPhoneList(res.phoneList || []);
        setTotalPage(res.totalPage || 0);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathQuery]);

  useEffect(() => {
    setCategoryInfo(props.categoryInfo);
    setPhoneList(props.phoneList);
    setTotalPage(props.totalPage);

    if (pathQuery) return;

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.categoryInfo, props.phoneList, props.totalPage]);

  async function fetchData(query) {
    const res = await fetch(
      `${API}/v2/brand/${props.categoryInfo.slug}?${query}`
    );

    return await res.json();
  }
  if (Router.isFallback)
    return (
      <div className="grid place-items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

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
        {showFilter && (
          <div onClick={() => setShowFilter(false)} className="h-screen">
            <div className="fixed top-0 right-0 w-full h-full bg-black opacity-50 z-10"></div>
          </div>
        )}
        <div
          className={`${
            showFilter
              ? "bg-white h-full overflow-y-auto fixed z-[100]  top-0 right-0 transition-all duration-300 "
              : " absolute  h-full z-[100]   top-0 -right-96 transition-all duration-300  ease-in-out"
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
                  {information[key].map((option, idx) => (
                    <div className="flex p-2 hover:bg-gray-100" key={idx}>
                      <Checkbox
                        name="information"
                        onChange={(e) =>
                          updateState(e.target.value, setInfoIDs)
                        }
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
          {Object.keys(overview).map((key, idx) => (
            <div key={idx} className="bg-white rounded-[4px] shadow-sm">
              <Collapse expandIconPosition={"end"} bordered={false}>
                <Panel header={key} key="1">
                  {overview[key].map((option, idx) => (
                    <div className="flex p-2 hover:bg-gray-100" key={idx}>
                      <Checkbox
                        name="overview"
                        onChange={(e) =>
                          updateState(e.target.value, setOverviewIDs)
                        }
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
                setIsFilterOn(true);
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
              phoneList.map((phone, idx) => (
                <ProductCard key={idx} phone={phone} />
              ))}
          </div>

          <div className=" p-3  md:p-12 pt-3 md:pt-3  rounded-[4px]  ">
            <div className="flex justify-center p-[20px] bg-white shadow-sm rounded-[4px]">
              <Pagination
                current={page}
                onChange={(number) => {
                  setPage(number);
                  setIsLoading(true);
                  setIsFilterOn(true);
                }}
                total={totalPage * 20}
                pageSize={20}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/brand`);
  const data = await res.json();
  const paths = data.map((brand) => ({ params: { slug: brand.slug } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params, query }) {
  // Fetch data from the API based on the slug parameter
  const res = await fetch(`${API}/v2/brand/${params.slug}`);
  const data = await res.json();

  if (!data.totalPage) {
    return {
      notFound: true,
    };
  }

  const { phoneList, categoryInfo, totalPage } = data;

  // Pass data to the page component as props
  return {
    props: { phoneList, categoryInfo, totalPage },
  };
}
