import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
    faSearch,
    faCalendar,
    faAndroid,
} from "@fortawesome/free-solid-svg-icons";


export default function Phone({ data }) {

    return (

        <>
            <Head>
                <title>phone</title>
            </Head>
            <div className="bg-white shadow-md rounded-md p-4">
                <div className="flex  gap-12">
                    <div className="grid items-center">
                        <Image src={data.photoUrl} alt={data.photoUrl} width={200} height={200} />
                    </div>
                    <div>
                        <h2 className="text-xl font-medium text-gray-800 mb-4">Overview</h2>
                        {data.overview.map((feature, idx) => (
                            <div key={idx} className="flex items-center mb-1">
                                <h1 className="text-gray-700 mr-4">{feature.feature}</h1>

                                <span className="text-gray-600">{feature.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    {data.information.map((info, idx) => (
                        <div className="border my-12 border-gray-700 rounded-[10px] overflow-hidden" key={idx}>
                            <h1 className="text-md text-white px-4 py-2  font-medium bg-gray-800 mb-2">{info.tabName}</h1>
                            <div>
                                {info.options.map((option, idx) => (
                                    <div key={idx} className="border-b last-child():border-0 px-4  flex mb-2">
                                        <b className="text-gray-700 mr-4">{option.option}</b>
                                        <span className="text-gray-600">{option.value}</span>
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
    const res = await fetch(`https://gsmarena-three.vercel.app/phone/${params.slug}`);
    const data = await res.json();
    console.log(data);
    // Pass data to the page component as props
    return {
        props: { data }
    };
}