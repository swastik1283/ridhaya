import { useState } from 'react';
import axios from 'axios';
import { BackendUrl, currency } from '../App'
const AddPage = () => {
  const [form, setForm] = useState({
    PageName: '',
    slug: '',
    description: '',
    keywords: '',
    metaDesc: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
     await axios.post("http://localhost:4000/api/pages/add",form)
      alert('Page added!');
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Add New Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="PageName" placeholder="Page Name" onChange={handleChange} required className="border p-2 w-full" />
        <input name="slug" placeholder="Slug (e.g., about-us)" onChange={handleChange} required className="border p-2 w-full" />
        <textarea name="description" placeholder="Description HTML" onChange={handleChange} required className="border p-2 w-full h-32" />
        <input name="keywords" placeholder="SEO Keywords" onChange={handleChange} className="border p-2 w-full" />
        <input name="metaDesc" placeholder="Meta Description" onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Page</button>
      </form>
    </div>
  );
};

export default AddPage;
