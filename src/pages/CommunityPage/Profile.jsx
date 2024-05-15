import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { setAuthUser } = useAuthContext();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // State to store uploaded image URL

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
        { withCredentials: true }
      );
      const userData = user.data.data;
      console.log("User data:", userData);
      // setUser(userData); // Set user data to state
      // Set input field values with user data using setValue
      setValue("fullName", userData.fullName);
      setValue("username", userData.username);
      setValue("gender", userData.gender);
    };
    getUser();
  }, [refetch, setValue]);

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log("🚀 ~ handleChange ~ file:", file);
    setSelectedImage(file);
  };

  const onSubmit = async (data) => {
    if (selectedImage) {
      try {
        const imgBBUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_BB_API_KEY
        }`;
        const formData = new FormData();
        formData.append("image", selectedImage);

        axios
          .post(imgBBUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Image uploaded successfully:", response.data.data);
            setImageUrl(response.data.data.display_url);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            alert("Error uploading image. Please try again.");
          });

        // const imgBBResponse = await axios.post(imgBBUrl, selectedImage);

        // const imgBBData = await imgBBResponse.json();
        // if (!imgBBData.success) {
        //   console.error(
        //     "Error uploading image to ImgBB:",
        //     imgBBData.error.message
        //   );
        //   return; // Handle ImgBB upload error (optional: display error message to user)
        // }

        // setImageUrl(imgBBData.data.display_url); // Set the uploaded image URL
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        return; // Handle error (optional: display error message to user)
      }
    }

    // Send data to backend with imageUrl (if available)
    const backendData = { ...data, profilePic: imageUrl }; // Create data object with imageUrl

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        backendData,
        {
          withCredentials: true, // Include credentials for authenticated requests
        }
      );

      if (!response.data.success) {
        console.error(response.data.data.msg); // Handle errors from the server
        return toast.error(response.data.data.msg);
      }
      toast.success(response.data.msg);
      setRefetch(!refetch);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.data.data.msg);
    }
  };

  const handlePasswordChange = async (payload) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/changePass`,
        payload,
        {
          withCredentials: true, // Include credentials for authenticated requests
        }
      );
      console.log("🚀 ~ handlePasswordChange ~ response:", response);

      // if (!response.data.success) {
      //   console.error(response.data.data.msg); // Handle errors from the server
      //   return toast.error(response.data.data.msg);
      // }
      if (response.data.success) {
        toast.success(response.data.msg);
        reset();
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <section className="space-y-5">
      <div className="border border-[#18BB0C] max-w-3xl mx-auto rounded-lg p-5  shadow-md">
        <h3 className="my-2 flex items-center justify-center text-xl font-bold">
          Update Basic Info
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-sm md:max-w-xl mx-auto"
        >
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium "
            >
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              {...register("fullName")}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium "
            >
              Email
            </label>
            <input
              name="username"
              type="text"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              {...register("username")}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="gender" className="block mb-2 text-sm font-medium ">
              Gender
            </label>
            <select
              name="gender"
              type="text"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium ">
            Password
          </label>
          <input
            name="password"
            type="text"
            className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            {...register("password")}
          />
        </div> */}
          <div className="mb-5">
            <label
              htmlFor="profilePic"
              className="block mb-2 text-sm font-medium "
            >
              Profile Picture
            </label>
            <input
              name="profilePic"
              type="file"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              {...register("profilePic")}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="border border-[#18BB0C] max-w-3xl mx-auto rounded-lg p-5  shadow-md">
        <h3 className="my-2 flex items-center justify-center text-xl font-bold">
          Change Password
        </h3>
        <form
          onSubmit={handleSubmit(handlePasswordChange)}
          className="max-w-sm md:max-w-xl mx-auto"
        >
          <div className="mb-5">
            <label
              htmlFor="oldPassword"
              className="block mb-2 text-sm font-medium "
            >
              Old Password
            </label>
            <input
              name="oldPassword"
              type="password"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              {...register("oldPassword")}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium "
            >
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              {...register("newPassword")}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
