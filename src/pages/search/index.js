import ProductCard from "@/components/Card/ProductCard";
import { API, APP_NAME } from "@/config";
import { Button, Collapse, Input, Select, Spin } from "antd";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
const Panel = Collapse.Panel;
export default function Search() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log(data, categories);
  const [catId, setCatId] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const setSearchHandler = async () => {
    setLoading(true);
    let res;
    if (catId && search) {
      res = await fetch(`${API}/search/?cat=${catId}&slug=${search}`);
    }
    if (!catId && search) {
      res = await fetch(`${API}/search/?slug=${search}`);
    }

    const resData = await res.json();

    setData(resData.phoneList);
    setLoading(false);
  };

  useEffect(
    () => {
      if (!search) {
        setLoading(true);
        fetch(`${API}/search/`)
          .then((res) => res.json())
          .then((mobiles) => {
            setData(mobiles.phoneList);
            setLoading(false);
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/brand`)
      .then((res) => res.json())
      .then((cats) => {
        setCategories(cats);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NextSeo
        title={`${APP_NAME} - Find Your Dream Phone`}
        description={`${APP_NAME} - Find Your Dream Phone`}
      />
      <main>
        <div className="py-10 px-3">
          <div className="bg-orange-100 rounded-xl py-10 max-w-3xl mx-auto mb-8">
            <div
              className="
              max-w-[500px] mx-auto
              px-4 sm:px-6 lg:px-8
           
  
            "
            >
              <div className="mb-3 ">
                {" "}
                <Input
                  placeholder="Search Your Next Phone"
                  size="large"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <Select
                  showSearch
                  style={{ width: "70%" }}
                  size="large"
                  placeholder="All Brand"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  onChange={(value) => {
                    setCatId(value);
                  }}
                  options={categories.map((cat) => ({
                    label: cat.brandName,
                    value: cat._id,
                  }))}
                />
                <Button
                  className="bg-[#ef4a23] text-white hover:bg-[#ef4a23] outline-none"
                  size="large"
                  style={{ marginLeft: "10px" }}
                  onClick={() => setSearchHandler()}
                >
                  Search
                </Button>
              </div>
            </div>{" "}
          </div>

          <div className="mb-2  bg-white rounded-[4px] shadow-sm capitalize  mx-3 md:mx-12 flex justify-between items-center px-3 ">
            <div
              onClick={() => setShowFilter(!showFilter)}
              className="border cursor-pointer text-gray-700 px-4 rounded-[4px] my-2 flex md:hidden"
            >
              Filter
            </div>

            <h2 className="hidden md:flex text-[16px] font-bold  text-gray-700  p-3 ">
              Search Result
            </h2>
            <Select
              disabled
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
          {loading && (
            <>
              <div className=" h-[300px]  bg-white rounded-[4px] shadow-sm  grid place-items-center  mx-3 md:mx-12  ">
                <div className="text-center">
                  <Spin size="large" />
                  <h1>Hold On, We Are Finding Your Phone!!!</h1>
                </div>
              </div>
            </>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5   gap-5 p-3  md:p-12 pt-3 md:pt-3 ">
            {!loading &&
              data?.map((phone) => (
                <ProductCard key={phone._id} phone={phone} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
