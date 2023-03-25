import { API } from "@/config";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Brand({ phoneList, categoryInfo }) {
    const { query } = useRouter();
    const { slug } = URLSearchParams

    const page = query.page || 1;


    return (
        <>
            <Head>
                <title>
                    {categoryInfo.brandName}
                </title>
            </Head>

            <div className="flex gap-5 m-2 overflow-x-auto max-w-7xl mx-auto p  px-4 sm:px-6 lg:px-8">
                <div className=" text-gray-800 py-1 px-3 rounded-full inline-flex items-center text-xs">
                    <Link href="/">
                        <h3>Home</h3>
                    </Link>
                </div>
                /
                <div className="text-gray-800 py-1 px-3 rounded-full inline-flex items-center text-xs">
                    <Link href={`/brand/${categoryInfo._id}`}>
                        <h3>{categoryInfo.brandName}</h3>
                    </Link>
                </div>
            </div>



            <div className="bg-gray-200">
                <h2 className="text-2xl font-bold  text-gray-700 pt-5 text-center">{categoryInfo.brandName}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  lg:grid-cols-7 gap-5 p-3 md:p-12 pt-3 md:pt-3 bg-gray-50">

                {
                    phoneList.map((phone) => (
                        <Link key={phone.id} href={{
                            pathname: `/phone/[slug]`,
                            query: { slug: phone?._id },
                        }}>
                            <div className="bg-white hover:shadow rounded-md p-4">
                                <div className=" flex justify-center">
                                    <Image src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${phone.images[0]}`} width={100} height={200} alt={phone.deviceName} />
                                </div>
                                <h1 className="mt-4 text-xl text-center font-medium text-gray-800">{phone.deviceName}</h1>
                                {/* <p className="text-gray-600 text-xs max-h-[200px] overflow-hidden hover:text-gray-800 transition-colors">{phone.details}</p> */}
                                <p> {phone?.prices[0].BDT} TAKA</p>

                            </div>
                        </Link>
                    ))
                }
            </div>
            <div className="max-w-7xl mx-auto  px-8 mb-8 ">
                <nav className="flex justify-center gap-6" aria-label="Pagination">
                    {page > 1 && (
                        <Link
                            href={{
                                pathname: `/brand/${categoryInfo._id}`,
                                query: { page: parseInt(page) - 1 },
                            }}
                            className="px-3 border py-2 border-gray-900 hover:bg-gray-900 hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            &laquo; Prev Page
                        </Link>
                    )}

                    <Link
                        href={{
                            pathname: `/brand/${categoryInfo._id}`,
                            query: { page: parseInt(page) + 1 },
                        }}
                        className="px-3 py-2 border border-gray-900 hover:bg-gray-900 hover:text-white"
                    >
                        <span className="sr-only">Next</span>
                        Next Page &raquo;
                    </Link>
                </nav>
            </div>
        </>
    );
}

export async function getServerSideProps({ params, query }) {
    // Fetch data from the API based on the slug parameter
    const res = await fetch(`${API}/brand/${params.slug}?page=${query.page}`);
    const { phoneList, categoryInfo } = await res.json();

    // Pass data to the page component as props
    return {
        props: { phoneList, categoryInfo }
    };
}