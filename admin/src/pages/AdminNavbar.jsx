import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminNavbar = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    parentId: '',
    order: 0,
    isVisible: true,
  });
  const [editId, setEditId] = useState(null);

  const fetchNavbarItems = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/navbar');
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch navbar items:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const finalData = {
      ...formData,
      parentId: formData.parentId === '' ? null : formData.parentId,
    };

    if (editId) {
      await axios.put(`http://localhost:4000/api/navbar/${editId}`, finalData);
    } else {
      await axios.post('http://localhost:4000/api/navbar', finalData);
    }

    setFormData({ title: '', link: '', parentId: '', order: 0, isVisible: true });
    setEditId(null);
    fetchNavbarItems();
  } catch (err) {
    console.error('Failed to submit navbar item:', err);
  }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/navbar/${id}`);
      fetchNavbarItems();
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      title: item.title,
      link: item.link,
      parentId: item.parentId || '',
      order: item.order || 0,
      isVisible: item.isVisible,
    });
  };

  useEffect(() => {
    fetchNavbarItems();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Navbar Manager</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-center mb-10 bg-white p-4 shadow rounded"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border px-3 py-2 rounded col-span-2"
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Link"
          value={formData.link}
          onChange={handleChange}
          className="border px-3 py-2 rounded col-span-2"
          required
        />
        <select
          name="parentId"
          value={formData.parentId}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">No Parent</option>
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="order"
          value={formData.order}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          placeholder="Order"
        />
        <div className="flex items-center space-x-2 col-span-1">
          <input
            type="checkbox"
            name="isVisible"
            checked={formData.isVisible}
            onChange={handleChange}
          />
          <span className="text-sm">Visible</span>
        </div>

        <div className="flex gap-2 col-span-2 sm:col-span-1">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            {editId ? 'Update' : 'Add'}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ title: '', link: '', parentId: '', order: 0, isVisible: true });
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded w-full"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <h3 className="text-xl font-semibold mb-3">Navbar Items</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <strong>{item.title}</strong> – {item.link}{' '}
              {item.parentId && (
                <span className="text-sm text-gray-500"> (Child)</span>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNavbar;
