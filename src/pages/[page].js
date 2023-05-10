import ProductCard from "@/components/Card/ProductCard";
import { API, APP_NAME } from "@/config";
import { Pagination, Select } from "antd";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({
  latestPhones,
  topCategories,
  total,
  allCategories,
  popularPhones,
}) {
  const Router = useRouter();
  const { query } = Router;
  const page = query.page || 1;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };

    const end = () => {
      console.log("finished");
      setLoading(false);
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

  if (Router.isFallback || loading) return <div>Loading...</div>;

  return (
    <>
      <NextSeo
        title={`${APP_NAME} - Find Your Dream Phone`}
        description={`${APP_NAME} - Find Your Dream Phone`}
      />

      <main>
        <div className="col-span-1 md:col-span-9  ">
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
              <ProductCard key={phone._id} phone={phone} />
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
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API}/home?page=${params.page || ""}`);
  const { latestPhones, total } = await res.json();

  return {
    props: {
      latestPhones,
      total,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
