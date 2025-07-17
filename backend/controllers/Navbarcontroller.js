import NavbarItem from '../models/NavbarModel.js';

// GET all visible navbar items
export const getVisibleNavItems = async (req, res) => {
  try {
    const items = await NavbarItem.find({ isVisible: true }).sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch navbar items' });
  }
};

// POST to add a new navbar item

import mongoose from 'mongoose';

export const addNavbarItem = async (req, res) => {
  try {
    const { title, link, parentId, order, isVisible } = req.body;

    const newItemData = {
      title,
      link,
      order,
      isVisible,
    };

    // ✅ Add parentId only if it's a valid ObjectId
    if (parentId && mongoose.Types.ObjectId.isValid(parentId)) {
      newItemData.parentId = parentId;
    }

    const newItem = new NavbarItem(newItemData);
    await newItem.save();

    res.status(201).json({ success: true, message: 'Navbar item added successfully', data: newItem });
  } catch (error) {
    console.error('Error adding navbar item:', error);
    res.status(400).json({ success: false, message: 'Failed to add navbar item', error });
  }
};



// PUT to update an item
export const updateNavbarItem = async (req, res) => {
  try {
    const updated = await NavbarItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update navbar item' });
  }
};

// DELETE an item
export const deleteNavbarItem = async (req, res) => {
  try {
    await NavbarItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete navbar item' });
  }
};
