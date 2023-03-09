import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Search({ data }) {

    return (
        <>
            <Head>
                <title>Brand</title>
            </Head>
            <div className="grid grid-cols-4 gap-5 p-12 bg-gray-200">
                {
                    data.phones.map((phone) => (
                        <div key={phone.id} className="bg-white shadow-md rounded-md p-4">
                            <div className=" text-center">
                                <Image src={phone.image} alt={phone.name} width={200} height={200} />
                            </div>
                            <h1 className="mt-4 text-xl font-medium text-gray-800">{phone.name}</h1>
                            <p className="text-gray-600 text-xs max-h-[200px] overflow-hidden hover:text-gray-800 transition-colors">{phone.details}</p>
                            <div className="mt-5">
                                <Link
                                    className="  bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    href={{
                                        pathname: '/phone/[slug]',
                                        query: { slug: phone?.link },
                                    }}>
                                    See Details
                                </Link>
                            </div>


                        </div>
                    ))

                }
            </div></>
    );
}

export async function getServerSideProps({ params }) {
    // Fetch data from the API based on the slug parameter
    const res = await fetch(`https://gsmarena-three.vercel.app/search/${params.slug}`);
    const data = await res.json();
    console.log(data);
    // Pass data to the page component as props
    return {
        props: { data }
    };
}