import express from 'express';
import {
  getVisibleNavItems,
  addNavbarItem,
  updateNavbarItem,
  deleteNavbarItem
} from '../controllers/Navbarcontroller.js';

const Navbarrouter = express.Router();

Navbarrouter.get('/', getVisibleNavItems);
Navbarrouter.post('/', addNavbarItem);
Navbarrouter.put('/:id', updateNavbarItem);
Navbarrouter.delete('/:id', deleteNavbarItem);

export default Navbarrouter;
