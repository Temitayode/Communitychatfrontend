import React from 'react'
import mainImage from "../../assets/Main.png";
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";
import image4 from "../../assets/4.png";
import image5 from "../../assets/5.png";
import image6 from "../../assets/6.png";

import hu1 from "../../assets/hu1.png";
import hu2 from "../../assets/hu2.png";
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';

const Home = () => {


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 my-[100px] mx-auto max-w-6xl">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 rounded-lg">
                <img src={mainImage} alt="imageImage" />

            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 rounded-lg">
                <div className="p-3 border border-gray-300 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <img src={image1} alt="Image 1" className="rounded-lg" />
                        <img src={image2} alt="Image 2" className="rounded-lg" />
                        <img src={image3} alt="Image 3" className="rounded-lg" />
                        <img src={image4} alt="Image 4" className="rounded-lg" />
                        <img src={image5} alt="Image 5" className="rounded-lg" />
                        <img src={image6} alt="Image 6" className="rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 rounded-lg">
                <div className="p-3 border border-gray-300 rounded-lg">

                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 rounded-lg">
                <div className="p-3 border border-gray-300 rounded-lg flex justify-center">
                    <Link to='/chatPage'>
                        <div className="grid grid-cols-1 sm:grid-cols-1">
                            <div className="h-[300px] overflow-y-auto">
                                <Sidebar />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home