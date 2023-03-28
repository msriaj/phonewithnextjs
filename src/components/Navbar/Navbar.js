import { API, APP_NAME } from "@/config";
import { Input, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetch(`${API}/top-categories`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleSearch = (e) => {
    if (e.target.value.length > 2) {
      setSearchValue(e.target.value);
      fetch(`${API}/search?search=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResult(data);
        });
    }
  };

  return (
    <>
      <nav className="bg-[#091621]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-[#091621] inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <Link className="text-white font-bold text-xl mr-6 ml-2" href="/">
                {APP_NAME}
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/brand/${category._id}`}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {category.brandName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-orange-600 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setSearchModal(true)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/brand/${category._id}`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {category.brandName}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <Modal
        open={searchModal}
        onCancel={() => setSearchModal(false)}
        footer={null}
        closable={false}
        style={{ top: 150 }}
      >
        <Input
          size="large"
          onChange={(e) => handleSearch(e)}
          placeholder="Search for a phone"
        />
        <p className="my-3 text-gray-500">
          {searchResult.length > 3 && `Search Results for `}
          {searchResult.length > 3 && (
            <span className="font-bold text-gray-700">{searchValue}</span>
          )}
        </p>
        <div className="flex flex-col gap-2 mt-4">
          {searchResult.map((result) => (
            <Link
              key={result._id}
              href={`/phone/${result._id}`}
              className="text-gray-300 border-b border-gray-100 flex items-center gap-3  hover:bg-gray-100 hover:text-white   px-3 py-2 rounded-md text-base font-medium"
            >
              <Image
                alt={result.deviceName}
                src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${result.images[0]}`}
                width={35}
                height={35}
              />

              <div>
                <p className="mt-4 text-[14px] text-center font-medium text-gray-800">
                  {result.deviceName}
                </p>
                <p className="text-[#ef4a23]  font-semibold">
                  {" "}
                  {result?.prices[0].BDT}.00 TK
                </p>
              </div>
            </Link>
          ))}
          {searchValue >= 3 && searchResult.length === 0 && (
            <p className="text-center text-gray-400">No result found</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
