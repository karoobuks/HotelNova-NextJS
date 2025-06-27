
"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";


const RoomAddForm = () => {
  const [images, setImages] = useState([]);
  const [progresses, setProgresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef(null); // 💡 useRef for form fix

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files.slice(0, 4));
    setProgresses(files.map(() => 0));
  };

  const uploadImages = async () => {
    setLoading(true);
    const urls = [];

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("file", images[i]);
      formData.append("upload_preset", "vaultnova_unsigned"); // Update this
      formData.append("folder", "HotelNova");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/vaultnova-prod/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (e) => {
              const percent = Math.round((e.loaded * 100) / e.total);
              setProgresses((prev) => {
                const updated = [...prev];
                updated[i] = percent;
                return updated;
              });
            },
          }
        );
        urls.push(res.data.secure_url);
      } catch (error) {
        console.error("Image upload failed:", error.response?.data || error.message);
        toast.error('Image upload failed!')
      }
    }

    setLoading(false);
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedUrls = await uploadImages();
    if (!uploadedUrls.length) {
      toast.error("Image upload failed. Please try again.");
      return;
    }

    const formData = new FormData(formRef.current); // ✅ Fix applied here
    const roomData = {};

    formData.forEach((value, key) => {
      if (key === "amenities") {
        roomData[key] = roomData[key] || [];
        roomData[key].push(value);
      } else {
        roomData[key] = value;
      }
    });

    roomData.images = uploadedUrls;

    try {
      const res = await axios.post("/api/rooms", roomData);
      if (res.status === 201) {
        toast.success("Room added successfully!");
       router.push(`/rooms/${res.data.roomId}`);
        
        formRef.current.reset();
        setImages([]);
        setProgresses([]);
      } else {
      router.push("/error");
      }
    } catch (err) {
      console.error("Room creation failed:", err);
      toast.error("Room creation failed")
      router.push("/error");
    }
  };

  const amenityList = [
    "Free Wi-Fi", "Jacuzzi", "Room Service", "Smart TV", "Ocean View", "King Bed",
    "Mini Bar", "City View", "Work Desk", "Complimentary Breakfast", "Queen Bed",
    "Garden View", "Pool Access", "Kitchenette", "Living Room", "Two Queen Beds",
    "Bunk Beds", "Play Area", "Lounge Area", "Office Desk", "Personal Assistant",
    "Air Conditioning", "Double Bed"
  ];


  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <h2 className="text-3xl text-center font-semibold mb-6">Add Room</h2>

      <div className="mb-4">
        <label htmlFor="name">Room Name</label>
        <input type="text" name="name" id="name" className="border rounded w-full px-3 py-2" required />
      </div>

      <div className="mb-4">
        <label htmlFor="type">Room Type</label>
        <select name="type" id="type" className="border rounded w-full px-3 py-2" required>
          <option value="Executive">Executive</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Family">Family</option>
          <option value="Suite">Suite</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" className="border rounded w-full px-3 py-2" rows="4" />
      </div>

      <div className="mb-4">
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" className="border rounded w-full px-3 py-2" required />
      </div>

      <div className="mb-4">
        <label htmlFor="bookingStatus">Booking Status</label>
        <select name="bookingStatus" id="bookingStatus" className="border rounded w-full px-3 py-2">
          <option value="Open">Open</option>
          <option value="Booked">Booked</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {amenityList.map((amenity) => (
            <div key={amenity}>
              <input type="checkbox" name="amenities" value={amenity} className="mr-2" />
              <label>{amenity}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Review Fields
      <div className="mb-6 bg-gray-100 p-4 rounded">
        <h3 className="text-xl font-semibold mb-4">Guest Review</h3>
        <div className="mb-2">
          <label htmlFor="reviewer">Reviewer</label>
          <input type="text" name="reviewer" id="reviewer" className="border rounded w-full px-3 py-2" />
        </div>
        <div className="mb-2">
          <label htmlFor="comment">Comment</label>
          <textarea name="comment" id="comment" className="border rounded w-full px-3 py-2" rows="3" />
        </div>
        <div className="mb-2">
          <label htmlFor="rating">Rating (0–5)</label>
          <input type="number" name="rating" id="rating" min="0" max="5" className="border rounded w-full px-3 py-2" />
        </div>
        <div className="mb-2">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" id="date" className="border rounded w-full px-3 py-2" />
        </div>
      </div> */}

      <div className="mb-4">
        <label htmlFor="images">Upload up to 4 Images</label>
        <input
          type="file"
          id="images"
          name="images"
          className="border rounded w-full py-2 px-3"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />
      </div>

      <div className="mb-4">
        {progresses.map((p, i) => (
          <div key={i} className="text-sm text-blue-600">
            Uploading image {i + 1}: {p}%
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
      >
        {loading ? "Uploading..." : "Add Room"}
      </button>
    </form>
  );
};

export default RoomAddForm;
