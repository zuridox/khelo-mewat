import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { imageUp } from "../../../api/image";
import { updateUserInfo } from "../../../api/users";
import toast from "react-hot-toast";

const UpdateProfileModal = ({ setIsEditModalOpen, isOpen, refetch, user, id }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    setuserData(user);
  }, [user]);

  const handleImageUpdate = (image) => {
    setLoading(true);
    imageUp(image)
      .then((res) => {
        setuserData({ ...userData, image: res.data.display_url });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userData);
    const updatedData = Object.assign({}, { ...userData });
    delete updatedData._id;
    setLoading(true);
    updateUserInfo(updatedData, id)
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("User Data Updated!!!");
          setLoading(false);
          refetch();
          setIsEditModalOpen(false);
        } else {
          toast.error("Something wrong!!!");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  /* console.log(userData); */
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update user Info
                </Dialog.Title>
                <div className="mt-2 w-full">
                  <div className="w-full text-gray-800">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div className=" text-sm">
                          <label
                            htmlFor="name"
                            className="block text-gray-600 mb-2"
                          >
                            Name
                          </label>
                          <input
                            className="input_field "
                            name="name"
                            value={userData?.name}
                            onChange={(event) =>
                              setuserData({
                                ...userData,
                                name: event.target.value,
                              })
                            }
                            id="name"
                            type="text"
                            placeholder="Name"
                            required
                          />
                        </div>
                        <div className=" text-sm">
                          <label
                            htmlFor="title"
                            className="block text-gray-600 mb-2"
                          >
                            Phone
                          </label>
                          <input
                            value={userData?.phone}
                            onChange={(event) =>
                              setuserData({
                                ...userData,
                                phone: event.target.value,
                              })
                            }
                            className="input_field "
                            name="phone"
                            id="phone"
                            type="text"
                            maxLength={11}
                            placeholder="01XXXXXXXXX"
                            required
                          />
                        </div>
                        <div className=" text-sm">
                          <label
                            htmlFor="category"
                            className="block text-gray-600 mb-2"
                          >
                            Gender
                          </label>
                          <select
                            onChange={(event) =>
                              setuserData({
                                ...userData,
                                gender: event.target.value,
                              })
                            }
                            required
                            defaultValue={userData?.gender}
                            className="input_field"
                            name="gender"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className=" text-sm">
                          <label
                            htmlFor="title"
                            className="block text-gray-600 mb-2"
                          >
                            Address
                          </label>
                          <input
                            value={userData?.address}
                            onChange={(event) =>
                              setuserData({
                                ...userData,
                                address: event.target.value,
                              })
                            }
                            className="input_field "
                            name="address"
                            id="address"
                            type="text"
                            placeholder="address"
                            required
                          />
                        </div>
                        <div className="bg-white">
                          <label htmlFor="image" className="block mb-2 text-sm">
                            Select Image:
                          </label>
                          <input
                            onChange={(event) => {
                              handleImageUpdate(event.target.files[0]);
                            }}
                            className="text-sm cursor-pointer"
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="custom-btn bg-amber-500 rounded-md py-3 w-full text-white mt-5"
                      >
                        {loading ? (
                          <ImSpinner9
                            className="m-auto animate-spin"
                            size={24}
                          />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
                <hr className="mt-8 " />
                <div className="mt-2 ">
                  <button
                    type="button"
                    className="border-2 border-amber-300 px-3 rounded text-amber-500 hover:text-white  hover:bg-amber-500 transition-all duration-300 hover:border-amber-500"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateProfileModal;
