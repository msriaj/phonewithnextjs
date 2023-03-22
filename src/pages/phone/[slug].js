import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
    faSearch,
    faCalendar,
    faAndroid,
} from "@fortawesome/free-solid-svg-icons";
import { API } from "@/config";


export default function Phone({ data }) {

    return (

        <>
            <Head>
                <title>{data.deviceName}</title>
            </Head>
            <div className="bg-white shadow-md rounded-md p-4">
                <div className="flex  flex-col md:flex-row  gap-12">
                    <div className=" text-center">
                        <Image src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${data.images[0]}`} alt="hellow" width={200} height={200} />
                    </div>
                    <div>
                        <h2 className="text-xl font-medium text-gray-800 mb-4">{data.deviceName}</h2>

                        {data.overview.map((key, idx) => (
                            <div key={idx} className="flex items-center">
                                <FontAwesomeIcon icon={faCalendar} className="text-gray-600 mr-2" />
                                <span className="text-gray-600">
                                    {Object.keys(key)} : {Object.values(key)}
                                </span>
                            </div>
                        ))}


                    </div>
                </div>
                <div className="mt-4">
                    {data.information.map((info, idx) => (
                        <div className="border my-12 border-gray-700 rounded-[10px] overflow-hidden" key={idx}>
                            <h1 className="text-md text-white px-4 py-2  font-medium bg-gray-800 mb-2">{Object.keys(info)[0]}</h1>
                            <div>
                                {Object.values(info)[0].map((option, idx) => (
                                    <div key={idx} className="border-b last-child():border-0 px-4  flex mb-2">
                                        <b className="text-gray-700 mr-4">{Object.keys(option)[0]}</b>
                                        <span className="text-gray-600">{Object.values(option)[0]} </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>

    );
}

export async function getServerSideProps({ params }) {
    // Fetch data from the API based on the slug parameter
    const res = await fetch(`${API}/phone-details/${params.slug}`);
    const data = await res.json();
    console.log(data);
    // Pass data to the page component as props
    return {
        props: { data }
    };
}