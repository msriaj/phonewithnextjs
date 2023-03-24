import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";

// import the icons you need
import { API } from "@/config";
import { faCalendar, faMobile, faRobot, faHdd, faTabletAndroid, faCamera, faBattery, faMemory } from "@fortawesome/free-solid-svg-icons";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import Link from "next/link";

export default function Phone({ data }) {
  const icons = {
    released: <div className="text-gray-600">

      <FontAwesomeIcon
        icon={faCalendar}
        className=" mr-2"
      /> Released:
    </div>,
    body: <div className="text-gray-600"><FontAwesomeIcon
      icon={faMobile}
      className="text-gray-600 mr-2"
    />
      Body:
    </div>,
    os: <div className="text-gray-600"><FontAwesomeIcon
      icon={faRobot}
      className="text-gray-600 mr-2"
    />
      OS:
    </div>,
    storage: <div className="text-gray-600"><FontAwesomeIcon
      icon={faHdd}
      className="text-gray-600 mr-2"
    />
      Storage:
    </div>,
    displaysize: <div className="text-gray-600"><FontAwesomeIcon
      icon={faTabletAndroid}
      className="text-gray-600 mr-2"
    />
      Display:
    </div>,
    camerapixels: <div className="text-gray-600"><FontAwesomeIcon
      icon={faCamera}
      className="text-gray-600 mr-2"
    />
      Camera:
    </div>,
    batsize: <div className="text-gray-600"><FontAwesomeIcon
      icon={faBattery}
      className="text-gray-600 mr-2"
    />
      Battery:
    </div>,
    ramsize: <div className="text-gray-600"><FontAwesomeIcon
      icon={faMemory}
      className="text-gray-600 mr-2"
    />
      RAM:
    </div>

  }
  return (
    <>
      <Head>
        <title>{data.deviceName}</title>
      </Head>
      <div>
        <div className="flex justify-center items-center bg-gray-100 py-4">
          <div className="container">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-700">
                Home
              </Link>
              <span className="text-gray-500">/</span>
              <Link href="/phones" className="text-gray-700">
                Phones
              </Link>
              <span className="text-gray-500">/</span>
              <Link href={`/brand/${data.categoryInfo._id}`} className="text-gray-700">
                {data.categoryInfo.brandName}
              </Link>
              <span className="text-gray-500">/</span>
              <Link href="/" className="text-gray-700">
                {data.deviceName}
              </Link>

            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-md p-4">
          <div className="flex  flex-col md:flex-row  gap-12">
            <div className="flex justify-center text-center">
              <Image
                src={`https://res.cloudinary.com/dpny6m6gz/image/upload/${data.images[0]}`}
                alt="hellow"
                width={200}
                height={200}
              />
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">
                {data.deviceName}
              </h2>
              <div className="my-4">
                <p className="text-gray-700">{data.details}
                </p>
              </div>
              {data.overview.map((key, idx) => (
                <div key={idx} className="flex items-center">

                  <b>  {icons[Object.keys(key)[0]]}</b>
                  <span className="text-gray-600 ml-2">
                    {Object.values(key)} {(Object.keys(key)[0] == "ramsize") && "GB"} {(Object.keys(key)[0] == "batsize") && "mAh"} {(Object.keys(key)[0] == "camerapixels") && "MP"} {(Object.keys(key)[0] == "displaysize") && "Inch"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            {data.information.map((info, idx) => (
              <div
                className="border my-12 border-gray-700 rounded-[10px] overflow-hidden"
                key={idx}
              >
                <h1 className="text-md text-white px-4 py-2  font-medium bg-gray-800 mb-2">
                  {Object.keys(info)[0]}
                </h1>
                <div>
                  {Object.values(info)[0].map((option, idx) => (
                    <div
                      key={idx}
                      className="border-b last-child():border-0 px-4  flex mb-2"
                    >
                      <b className="text-gray-700 mr-4">
                        {Object.keys(option)[0]}
                      </b>
                      <span className="text-gray-600">
                        {Object.values(option)[0]}{" "}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  // Fetch data from the API based on the slug parameter
  const res = await fetch(`${API}/phone-details/${params.slug}`);
  const data = await res.json();

  return {
    props: { data },
  };
}
