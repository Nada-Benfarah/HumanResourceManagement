import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingImage from "../assets/tube-spinner.svg";
import ErrorImage from "../assets/icon-error.svg";

const CircleImage = ({ url, size }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchImage = async () => {
      setLoading(true);
      setImageUrl(null);
      try {
        const { data } = await axios.get(url, {
          signal: controller.signal,
          responseType: "blob",
        });
        setImageUrl(URL.createObjectURL(data));
      } catch (e) {
        console.log(e);
      } finally {
        // setTimeout(() => {
        //   setLoading(false);
        // }, 1000);

        setLoading(false);
      }
    };
    fetchImage();
    return () => controller.abort();
  }, [url]);
  return (
    <img
      style={{ borderRadius: "50%", objectFit: "cover" }}
      src={loading ? LoadingImage : imageUrl == null ? ErrorImage : imageUrl}
      height={size}
      width={size}
    />
  );
};

export default CircleImage;
