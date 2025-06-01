// Example: src/components/ProfileForm.jsx
import { useState, useEffect } from 'react';

const ProfileForm = ({ profile, setProfile }) => {
  const [form, setForm] = useState(profile);
  const [message, setMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || '');

  // When the profile prop changes (e.g. after save), update the form state
  useEffect(() => {
    setForm(profile);
    setAvatarPreview(profile.avatar || '');
  }, [profile]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file upload and preview
  const handleAvatarFile = e => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, avatarFile: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const formData = new FormData();
    formData.append('name', form.name || '');
    formData.append('phone', form.phone || '');
    formData.append('address', form.address || '');
    formData.append('rollNumber', form.rollNumber || '');
    formData.append('branch', form.branch || '');
    formData.append('year', form.year ? Number(form.year) : '');
    if (form.avatarFile) {
      formData.append('avatar', form.avatarFile);
    }

    const res = await fetch('http://localhost:3000/api/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        // Do NOT set Content-Type, browser will set it for FormData
      },
      body: formData
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: await res.text() };
    }

    if (res.ok) {
      setMessage('Profile updated!');
      setProfile(data.user); // Now update the main profile state
    } else {
      setMessage(data.message || 'Error updating profile');
    }
  };

  console.log('Avatar URL:', profile.avatar);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-100 mt-8"
    >
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile.avatar || "https://randomuser.me/api/portraits/men/46.jpg"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mb-2 border"
        />
        <label className="cursor-pointer bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-2 mb-2 transition">
          Upload Avatar
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarFile}
            className="hidden"
          />
        </label>
        {form.avatarFile && (
          <span className="text-xs text-gray-500">{form.avatarFile.name}</span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
          <input
            name="name"
            value={form.name || ''}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 transition bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
          <input
            name="phone"
            value={form.phone || ''}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 transition bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
          <input
            name="address"
            value={form.address || ''}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 transition bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Roll Number</label>
          <input
            name="rollNumber"
            value={form.rollNumber || ''}
            onChange={handleChange}
            placeholder="Roll Number"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 transition bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
          <input
            name="branch"
            value={form.branch || ''}
            onChange={handleChange}
            placeholder="Branch"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 transition bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
          <input
            name="year"
            value={form.year || ''}
            onChange={handleChange}
            placeholder="Year"
            type="number"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 transition bg-gray-50"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-10 w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide"
      >
        Save Changes
      </button>
      {message && (
        <div className="text-center text-green-600 font-semibold mt-4">{message}</div>
      )}
    </form>
  );
};

export default ProfileForm;