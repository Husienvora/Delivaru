import React, { useState, useContext, useEffect } from "react";
import { Buffer } from "buffer";
import "./index.css";
import { useGlobalContext } from "./context.js";
function Image() {
  const { getImage, data, UploadImage, DeleteImages } = useGlobalContext();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [Refresh, setRefresh] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmission = async () => {
    var formData = new FormData();

    formData.append("testImage", selectedFile);
    // await axios
    //   .post(BaseUrl + "/image/uploadimage", {
    //     formData,
    //   })
    //   .then((res) => {
    //     return res.data;
    //   });

    await UploadImage(
      new Date().getMinutes() + new Date().getMinutes(),
      formData
    );
    setRefresh(!Refresh);

    window.location.reload();
  };
  useEffect(() => {
    getImage();
  }, [Refresh]);

  return (
    <div className="App">
      <h1>Photo Wall</h1>
      {data.map((singleData) => {
        // const base64String = Buffer.from(singleData.img.data.data, "base64");

        return (
          <div key={singleData._id} className="Imagecard">
            <img
              className="image"
              src={`data:${singleData.contentType};base64, ${Buffer.from(
                singleData.img.data.data
              ).toString("base64")}`}
              width="300"
            />
            <button
              className="imgbutton"
              onClick={async () => {
                await DeleteImages(singleData._id);
                setRefresh(!Refresh);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <div>
        <input type="file" name="file" onChange={changeHandler} />
        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={handleSubmission}>Upload</button>
        </div>
      </div>
    </div>
  );
}

export default Image;
