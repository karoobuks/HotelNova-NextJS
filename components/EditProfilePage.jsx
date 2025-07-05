'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn, signOut, update } from 'next-auth/react'; 


const EditProfilePage = ({ user }) => {
  const router = useRouter();
  const [submitting, setSubmitting]  = useState(false);
  const [form, setForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone', form.phone);
    if (form.image) formData.append('image', form.image);

    const res = await fetch('/api/profile/edit', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (res.ok) {
         toast.success('Profile updated')
          await signIn('credentials');

     window.location.href = '/profile';


    } else {
      toast.error('Update failed');
    }
    setSubmitting(false)
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Profile Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
              onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.size > 2 * 1024 * 1024) {
                toast.error('Image size must be under 2MB');
                return;
              }
              handleChange(e);
            }}
            className="w-full"
          />
        </div>

        <button 
         type="submit"
         disabled={submitting}
         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
         {submitting ? 'Updating Profile...' : 'Save Changes'}
        </button>
      </form>
    </section>
  );
};

export default EditProfilePage;
