import React, { useState } from "react";
import { BsCloudArrowDownFill, BsYoutube } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import { FaFaceSadTear } from "react-icons/fa6";
import { PropagateLoader } from "react-spinners";
import Typewriter from "typewriter-effect";
import "../Pages/NavBar.css";
import NavBar from "../Commen/Component/NavBar";
import firstPage from "../Commen/Image/firstPage.png";
import secPage from "../Commen/Image/secondPage.png";
import thirdPage from "../Commen/Image/thirdPage.png";
import SecondBg from "../Commen/Image/secondBg2.jpg";

function Downlod() {
  const [tableSize, setTableSize] = useState(true);
  const [url, setUrl] = useState("");
  const [youtubeLinks, setYTData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  // const [downloadLink, setDownloadLink] = useState(null);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDownLoad = () => {
    setIsLoading(true);
    setIsLoadingData(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    };

    fetch("http://localhost:8081/ytdown", requestOptions)
      .then((response) => {
        setIsLoading(false);
        setIsLoadingData(false);
        console.log("response", response);
        if (!response) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setYTData(data);
        setIsLoading(false);
        setIsLoadingData(false);
      })
      .catch((error) => {
        setIsLoading(true);
        setIsLoadingData(false);
        console.error("Fetch error:", error);
      });
  };

  // const handleDownloadLinks = async (videoUrl) => {
  //   try {
  //     // Make a GET request to the video URL to fetch the video content.
  //     const response = await fetch(videoUrl);

  //     if (!response.ok) {
  //       throw new Error(
  //         `Failed to fetch video: ${response.status} ${response.statusText}`
  //       );
  //     }

  //     console.log("response.statusText", response.statusText);
  //     console.log("response.status", response.status);
  //     // Convert the video content into a Blob.
  //     const videoBlob = await response.blob();

  //     // Create a URL for the Blob.
  //     const videoBlobUrl = URL.createObjectURL(videoBlob);

  //     // Create an anchor element for the download link.
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = videoBlobUrl;

  //     // Set the download attribute and filename for the link.
  //     downloadLink.download = "video.mp4"; // You can customize the filename here.

  //     // Simulate a click to trigger the download.
  //     downloadLink.click();

  //     // Clean up the Blob URL after the download link is clicked.
  //     URL.revokeObjectURL(videoBlobUrl);

  //     console.log("Video download initiated.");
  //   } catch (error) {
  //     console.error("Error downloading video:", error);
  //   }
  // };

  const handleDownloadLinks = async (videoUrl) => {
    console.log("videoUrl", videoUrl);
    try {
      // const { videoUrl } = this.state;

      if (!videoUrl) {
        alert("Please enter a valid video URL");
        return;
      }

      // const response = await fetch(videoUrl);

      // if (!response.ok) {
      //   alert('Failed to fetch the video');
      //   return;
      // }
      //       const videoData = await response.blob();
      // const videoUrlBlob = window.URL.createObjectURL(videoUrl);
      // console.log(response,"videoUrlBlob");

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = videoUrl;
      a.target = "_blank";
      a.download = "downloaded_video.mp4"; // Set the desired filename
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(videoUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };
  const totalSeconds = youtubeLinks?.videoDetails?.lengthSeconds || 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  let formattedTime;
  if (hours > 0) {
    formattedTime = `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  } else {
    formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  return (
    <>
      <div className="mainContainer">
        <NavBar />
        <div className="mainInputContainer">
          <div className="typewriterDiv">
            <Typewriter
              options={{
                strings: ["Free Video Downloader"],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 50,
              }}
            />
          </div>
          <div className="innerInputContainer">
            <input
              className="innerInput"
              type="text"
              placeholder="Enter youtube url here"
              onChange={(e) => handleChange(e)}
              autoFocus
              onDoubleClick={(e) => e.target.select()}
            />
            <button
              className="innerButton"
              disabled={!url}
              style={!url ? { backgroundColor: "#0d49b8" } : null}
              onClick={() => handleDownLoad()}
            >
              <div className="iconConatiner">
                <BsCloudArrowDownFill className="icon" />
                <span className="loddingText">
                  {isLoading === true ? "Loading..." : "Download"}
                </span>
              </div>
            </button>
          </div>
        </div>
        <div style={{ width: "100vw" }}>
          <div className="tableDataContainer">
            {isLoadingData ? (
              <PropagateLoader color="#0549c9" size={30} />
            ) : (
              <>
                {youtubeLinks && youtubeLinks?.adaptiveFormats ? (
                  <>
                    <div className="tableSideDataContainer">
                      <img
                        src={youtubeLinks?.videoDetails?.thumbnailsUrl}
                        alt="Image"
                        style={{ width: "270px" }}
                      />

                      <p className="ytlinkstitle">
                        {youtubeLinks?.videoDetails?.title}
                        <p style={{ fontSize: "22px" }}>
                          Duration: {formattedTime}
                        </p>
                      </p>
                    </div>
                    <div className="tablemainDataContainer">
                      <div className="tableHeadText">Downlod video as :</div>
                      <div className="bsYtIconMainDiv">
                        <div className="bsYtIconDiv">
                          <BsYoutube className="bsYoutubeIcon" />
                          <span>Video</span>
                        </div>
                      </div>
                      <div
                        className="tablesize"
                        style={{ height: tableSize ? "155px" : "382px" }}
                      >
                        {youtubeLinks?.adaptiveFormats?.map((item, index) => {
                          const url = item?.url;
                          {
                            console.log("url", url);
                          }
                          const mimeTypeWithoutCodecs =
                            item?.mimeType.split(";")[0];
                          const mimeTypeParts =
                            mimeTypeWithoutCodecs.split("/");
                          const fileFormat = mimeTypeParts[1];
                          return (
                            <>
                              {item?.qualityLabel && (
                                <div key={index} className="tableTextDiv">
                                  <div className="fileFormateDiv">
                                    <span style={{ fontWeight: 600 }}>
                                      {item?.qualityLabel} {fileFormat}
                                    </span>
                                  </div>

                                  <button
                                    className="faDownlodIconDiv"
                                    onClick={() =>
                                      handleDownloadLinks(item?.url)
                                    }
                                  >
                                    <FaDownload
                                      style={{ marginRight: "10px" }}
                                    />
                                    <span>Downlod</span>
                                  </button>
                                </div>
                                // {downloadLink && (
                                //   <a href={downloadLink} download="video.mp4">
                                //     Download Video
                                //   </a>
                                // )}
                              )}
                            </>
                          );
                        })}
                      </div>
                      <div
                        className="seeMoreBtn"
                        onClick={() => setTableSize(!tableSize)}
                      >
                        <span>{tableSize ? "See more" : "See less"}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="notDatafetchmainDiv">
                    <div className="sooryDiv">
                      <span>Sorry</span>
                      <FaFaceSadTear className="fafaSadIcon" />
                    </div>
                    <div className="sorryText">
                      <h1 style={{ color: "#ccc" }}>
                        {/* {youtubeLinks?.message} */}
                      </h1>
                      <span style={{ color: "#ccc" }}>
                        The downlod link not found
                      </span>
                    </div>
                  </div>
                )}{" "}
              </>
            )}
          </div>
          {/* {youtubeLinks?.length === 0 && url?.length !== 0 ? (
            <div>HIIIIIIIIIIIIIIIIIIIIIIIIIIII</div>
          ) : (
            <div className="notDatafetchmainDiv">
              <div className="sooryDiv">
                <span>Sorry</span>
                <FaFaceSadTear className="fafaSadIcon" />
              </div>
              <div className="sorryText">
                <span>The downlod link not found</span>
              </div>
            </div>
          )} */}
        </div>
      </div>
      <div style={{ background: `linear-gradient(to right, rgb(21, 21, 21), rgba(22, 22, 22))`, color:'rgb(212 212 212)'}}>
        <div>
          <div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <h1 style={{ color: "#08003a" }}>
              <Typewriter
              options={{
                strings: ["How to Use the YTDown Short Domain to Download Videos to Its Fullest"],
                autoStart: true,
                loop: true,
                delay: 70,
                deleteSpeed: 50,
              }}
            />
                 
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  width: "80%",
                }}
              >
                <div
                  style={{
                    width: "30%",
                    minWidth: "270px",
                  }}
                >
                  <div>
                    <p style={{ textAlign: "center" }}>
                      How to get to the YT video
                    </p>
                  </div>
                  <div>
                    <img
                      src={firstPage}
                      alt="firstPage"
                      style={{ width: "100%", height: "270px" }}
                    ></img>
                  </div>
                  <div
                    style={{
                      width: "80%",
                      textAlign: "center",
                      padding: "10px",
                      color: "#8f8f8f",
                    }}
                  >
                    <p>Go to the YouTube video you want to download first.</p>
                  </div>
                </div>
                <div style={{ width: "30%", minWidth: "270px" }}>
                  <div style={{ textAlign: "center" }}>
                    <p>Video URL with "YTDown"</p>
                  </div>
                  <div>
                    <img
                      src={secPage}
                      alt="secPage"
                      style={{ width: "100%", height: "270px" }}
                    ></img>
                  </div>
                  <div
                    style={{
                      width: "80%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    <p>
                      To start the YouTube transcoding and download process add Youtube video url in Input.
                    </p>
                  </div>
                </div>
                <div style={{ width: "30%", minWidth: "270px" }}>
                  <div style={{ textAlign: "center" }}>
                    <p>Easy step for Downloading video</p>
                  </div>
                  <div>
                    <img
                      src={thirdPage}
                      alt="thirdPage"
                      style={{ width: "100%", height: "270px" }}
                    ></img>
                  </div>
                  <div
                    style={{
                      width: "80%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    <p>
                      When you hit the "Enter" key a page with several download
                      choices will appear immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "75%",
            }}
          >
            <div>
              <h1>High-Quality YT Videos Download</h1>
            </div>
            <div>
              <p>
                You may convert videos to MP4 format and download them in high
                definition with our online YouTube downloader. You will receive
                outstanding video quality as a result. You may download videos
                from well-known websites like YouTube with our downloader YT Down. There are several resolutions
                available, including SD, HD, FullHD, 2K, and 4K. You can save a
                movie at the same resolution as when it was posted, 1080p, or
                choose a lesser quality.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "75%",
            }}
          >
            <div>
              <h1>Web Browsers Supported by Online Video Downloader</h1>
            </div>
            <div>
              <p>
                Numerous web browsers, including Google Chrome, Mozilla Firefox,
                Safari, Opera, and all Chromium-based browsers, are compatible
                with our online video downloader.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Downlod;
