const templateModel = require('../models/templateModel');

const createTemplate = async (req, res) => {
    try {
        const template = await templateModel.createTemplate(req.body);
        res.status(201).json(template);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating template' });
    }
};

const listTemplates = async (req, res) => {
    try {
        const templates = await templateModel.getAllTemplates();
        res.json(templates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching templates' });
    }
};

const getTemplate = async (req, res) => {
    try {
        const template = await templateModel.getTemplateById(req.params.id);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        res.json(template);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching template' });
    }
};

module.exports = {
    createTemplate,
    listTemplates,
    getTemplate,
};
