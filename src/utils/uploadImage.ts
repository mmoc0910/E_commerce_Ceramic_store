import axios from "axios";
import { imgbbAPI } from "../constants";

export const uploadImage = async (image: File) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("image", image);
    const response = await axios({
      method: "post",
      url: imgbbAPI,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.url;
  } catch (error) {
    console.log(error);
    return;
  }
};
