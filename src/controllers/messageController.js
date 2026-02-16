const messageModel = require('../models/messageModel');

const createMessage = async (req, res) => {
    try {
        const { subject, message, site_id } = req.body;
        if (!subject || !message) {
            return res.status(400).json({ message: 'Subject and message are required' });
        }
        const user_id = req.user.id;
        // Updated to pass site_id
        const newMessage = await messageModel.createMessage(user_id, site_id || null, subject, message);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating message' });
    }
};

const getMyMessages = async (req, res) => {
    try {
        const messages = await messageModel.getMessagesByUserId(req.user.id);
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching messages' });
    }
};

const getAllMessagesAdmin = async (req, res) => {
    try {
        const messages = await messageModel.getAllMessages();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching all messages' });
    }
};

const updateMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const message = await messageModel.updateMessageStatus(req.params.id, status);
        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating message status' });
    }
};

module.exports = {
    createMessage,
    getMyMessages,
    getAllMessagesAdmin,
    updateMessageStatus
};
