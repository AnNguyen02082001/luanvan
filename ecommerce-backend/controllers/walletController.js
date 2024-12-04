const { Wallet } = require('../models');

// Lấy tất cả Wallets
const getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.findAll({
      attributes: ['wallet_id', 'name'],
    });
    res.status(200).json(wallets);
  } catch (error) {
    console.error('Error fetching wallets:', error);
    res.status(500).json({ error: 'Failed to fetch wallets' });
  }
};

// Lấy chi tiết Wallet
const getWalletById = async (req, res) => {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findByPk(id, {
      attributes: ['wallet_id', 'name'],
    });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.status(200).json(wallet);
  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).json({ error: 'Failed to fetch wallet' });
  }
};

// Tạo Wallet mới
const createWallet = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newWallet = await Wallet.create({ name });

    res.status(201).json({
      message: 'Wallet created successfully',
      wallet: newWallet,
    });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ error: 'Failed to create wallet' });
  }
};

// Cập nhật Wallet
const updateWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const wallet = await Wallet.findByPk(id);

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    await wallet.update({ name });

    res.status(200).json({
      message: 'Wallet updated successfully',
      wallet,
    });
  } catch (error) {
    console.error('Error updating wallet:', error);
    res.status(500).json({ error: 'Failed to update wallet' });
  }
};

// Xóa Wallet
const deleteWallet = async (req, res) => {
  try {
    const { id } = req.params;

    const wallet = await Wallet.findByPk(id);

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    await wallet.destroy();

    res.status(200).json({ message: 'Wallet deleted successfully' });
  } catch (error) {
    console.error('Error deleting wallet:', error);
    res.status(500).json({ error: 'Failed to delete wallet' });
  }
};

module.exports = { getAllWallets, getWalletById, createWallet, updateWallet, deleteWallet };
