import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import { CiHeart } from "react-icons/ci";
import { FaRegPlayCircle } from "react-icons/fa";

const Home = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/gallery/data`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      const videos = data.filter((item) => item.video);
      const images = data.filter((item) => item.image);
      setVideoData(videos);
      setImageData(images);
      setGalleryData(data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 my-[100px] mx-auto max-w-6xl">
      <Link to={`/community/galleryDetails/${videoData[0]?._id}`}>
        <div className="card card-compactbg-white p-6 w-full shadow-md image-full bg-white border border-gray-300">
          <figure>
            <img
              src="https://i.ibb.co/CMLfZkc/pexels-inspiredimages-157543.jpg"
              className="rounded-lg w-full object-cover"
            />
          </figure>
          <div className="card-body">
            {/* <div className="flex items-center justify-between">
              <div className="badge badge-neutral font-semibold text-md text-white">
                LifeStyle
              </div>
              <CiHeart
                size="1.5em"
                color="white"
                className="hover:fill-red-500 hover:stroke-red-500 stroke-2 fill-transparent stroke-white"
                style={{ cursor: "pointer" }}
              />
            </div> */}
            <div className="card-body items-center justify-center">
              <div className="card-body items-center justify-center">
                <FaRegPlayCircle
                  size="2.5em"
                  className="text-white hover:text-green-500"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="bg-white shadow-md p-6 border border-gray-300 ">
        <div className="p-3 border border-gray-300 ">
          <div className="grid grid-cols-3 gap-4 mt-4">
            {imageData.slice(0, 5).map((image, index) => (
              <Link
                to={`/community/galleryDetails/${image?._id}`}
                key={image?._id.$oid}
              >
                <div className="card card-compact shadow-xl max-w-64 max-h-36">
                  <figure>
                    <img
                      src={image?.image}
                      alt={`Image ${index + 1}`}
                      className="rounded-xl"
                    />
                  </figure>
                </div>
              </Link>
            ))}
            {imageData?.length > 5 && (
              <Link to="/community/gallery/">
                <div className="card card-compact bg-base-content shadow-xl image-full bg-none max-w-64 max-h-36">
                  <figure>
                    <img
                      src="https://i.ibb.co/CMLfZkc/pexels-inspiredimages-157543.jpg"
                      className="rounded-lg w-full object-cover"
                    />
                  </figure>
                  <div className="card-body items-center justify-center">
                    <div className="avatar placeholder">
                      <div className="bg-base-content text-lg text-white  rounded-full w-12">
                        <span>+{imageData.length - 6}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Link to={"/community/topics"}>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 ">
          <div className="p-3 border border-gray-300 rounded-lg">
            Community topics
          </div>
        </div>
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 ">
        <div className="p-3 border border-gray-300 rounded-lg flex justify-center">
          <Link to="/chatPage">
            <div className="grid grid-cols-1 sm:grid-cols-1">
              <div className="h-[300px] overflow-y-auto">
                <Sidebar />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
