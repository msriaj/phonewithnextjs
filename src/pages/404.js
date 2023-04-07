import { NextSeo } from "next-seo";

const notFound = () => {
  return (
    <>
      <NextSeo
        title="404 - Page Not Found"
        description="404 - Page Not Found"
      />
      <div className="text-center py-36 bg-red-50 my-5">
        <h1 className="text-4xl text-red-500">404</h1>
        <h2 className="text-xl">Page Not Found</h2>
      </div>
    </>
  );
};

export default notFound;
