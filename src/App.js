import { useState } from "react";
import Selector from "./Selector";
import Canvas from "./Canvas";
import "./styles.css";

export default function App() {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  // Function to generate random date
  const getRandomDate = () => {
    const start = new Date(1995, 6, 16); // Start date
    const end = new Date(); // Today's date
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toISOString().split("T")[0];
  };

  // Function to fetch image from NASA's APOD archive
  const fetchNasaImage = async () => {
    const apiKey = "lzizSKGHLPP6bJGpb0lA6FWJIvnUj8z6QK7RLFhE";
    const randomDate = getRandomDate();
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("API Response:", data); // Log response for debugging

      if (response.ok) {
        setImageData(data);
        setError(null); // Clear error
      } else {
        setError(data.error || "Error fetching data");
      }
    } catch (error) {
      setError("Failed to display image. Please try again.");
    }
  };
  return (
    <div className="App">
      <h1>Cosmic Click</h1>
      <Selector action={fetchNasaImage} />
      {error && <p className="error">{error}</p>}
      <Canvas info={imageData} />
      <footer>
        © 2024{" "}
        <a href="https://codesandbox.io/p/sandbox/cosmic-click-p4ddhl">Code</a>
      </footer>
    </div>
  );
}
