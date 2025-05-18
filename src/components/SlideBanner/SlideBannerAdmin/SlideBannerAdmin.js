import axios from "axios";
import { useState } from "react";

function SlideBannerAdmin() {
  const [imageURL, setImageURl] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageURL);
    try {
      await axios.post("http://localhost:3002/slide-banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // const newSlideBanner = response.data.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Nhập file</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setImageURl(e.target.files[0])}
          required
        />
        <button type="submit">Tạo</button>
      </form>
    </div>
  );
}

export default SlideBannerAdmin;
