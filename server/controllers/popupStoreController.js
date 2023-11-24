const { PopupStore } = require("../models");
const { Image } = require("../models");
const PopupService = require("../services/popupService");

//! CREATE STORE
const createPopupStore = async (req, res) => {
  try {
    const popupService = new PopupService();
    const newStore = popupService.createPopupStore(req.body);

    if (!newStore) {
      return res.status(404).json({ message: "문제가 발생했습니다" });
    }

    res.status(200).json(newStore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! GET ONE STORE
const getPopupStore = async (req, res) => {
  const { id } = req.params;
  try {
    const popupService = new PopupService();
    const storeData = await popupService.getStore(id);

    if (!storeData) {
      return res.status(404).json({ message: "Popup Store not found" });
    }

    res.status(200).json(storeData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! GET ALL STORES
const getAllStores = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const popupService = new PopupService();
    const data = await popupService.getAllStores(page, limit);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! UPDATE STORE DATA
const updatePopupStore = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  try {
    const popupService = new PopupService();
    const popupStore = await popupService.updateStore(req.body, id);

    res.status(200).json(popupStore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! DELETE STORE DATA
const deletePopupStore = async (req, res) => {
  const { id } = req.params;

  try {
    const popupService = new PopupService();
    const deletedPopupStore = await popupService.deleteStore(id);

    if (!deletedPopupStore) {
      return res.status(404).json({ message: "Error during deletion" });
    }

    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! DELETE IMAGE
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const popupService = new PopupService();
    const updatedStore = await popupService.deleteImage(id);
    if (!updatedStore) {
      return res.status(404).json({ message: "Error during deletion" });
    }

    res.status(200).json(updatedStore);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

module.exports = {
  createPopupStore,
  getPopupStore,
  getAllStores,
  updatePopupStore,
  deletePopupStore,
  deleteImage,
};