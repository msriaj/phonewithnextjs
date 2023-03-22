import { API } from "@/config";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Brand({ data }) {

    return (
        <>
            <Head>
                <title>Brand Name</title>
            </Head>
            <div className="bg-gray-200">
                <h2 className="text-2xl font-bold  text-gray-700 pt-5 text-center">{data.catName}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  lg:grid-cols-7 gap-5 p-3 md:p-12 pt-3 md:pt-3 bg-gray-50">

                {
                    data.map((phone) => (
                        <Link key={phone.id} href={{
                            pathname: '/phone/[slug]',
                            query: { slug: phone?._id },
                        }}>
                            <div className="bg-white hover:shadow rounded-md p-4">
                                <div className=" flex justify-center">
                                    <Image src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${phone.images[0]}`} width={100} height={200} alt={phone.deviceName} />
                                </div>
                                <h1 className="mt-4 text-xl text-center font-medium text-gray-800">{phone.deviceName}</h1>
                                {/* <p className="text-gray-600 text-xs max-h-[200px] overflow-hidden hover:text-gray-800 transition-colors">{phone.details}</p> */}
                                {/* <p>Price : {phone?.prices[0].BDT}</p> */}

                            </div>
                        </Link>
                    ))
                }
            </div></>
    );
}

export async function getServerSideProps({ params }) {
    // Fetch data from the API based on the slug parameter
    const res = await fetch(`${API}/brand/${params.slug}`);
    const data = await res.json();
    console.log(data);
    // Pass data to the page component as props
    return {
        props: { data }
    };
}