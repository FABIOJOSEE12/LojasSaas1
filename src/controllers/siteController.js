const siteModel = require('../models/siteModel');

const createSiteRequest = async (req, res) => {
    try {
        const { template_id, name, content_json, category, colors, logo_url, description, contact_info, social_links, custom_domain } = req.body;
        const user_id = req.user.id;

        const site = await siteModel.createSite({ 
            user_id, 
            template_id, 
            name, 
            content_json,
            category,
            colors,
            logo_url,
            description,
            contact_info,
            description,
            contact_info,
            social_links,
            custom_domain
        });
        res.status(201).json(site);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating site request' });
    }
};

const getMySites = async (req, res) => {
    try {
        const sites = await siteModel.getSitesByUserId(req.user.id);
        res.json(sites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching sites' });
    }
};

const getSiteDetails = async (req, res) => {
    try {
        const site = await siteModel.getSiteById(req.params.id);
        if (!site) {
             return res.status(404).json({ message: 'Site not found' });
        }
        
        if (site.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(site);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching site details' });
    }
};

const getAllSitesAdmin = async (req, res) => {
    try {
        const sites = await siteModel.getAllSites();
        // Here we could enrich sites with user info if it's not already joined
        res.json(sites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching all sites' });
    }
}

const updateSiteStatus = async (req, res) => {
    try {
        const { status, live_url } = req.body;
        // Make sure siteModel.updateSiteStatus handles live_url if passed, or we do a separate update
        await siteModel.updateSiteStatus(req.params.id, status, live_url);
        
        if (live_url) {
             // live_url is already updated in the sites table by updateSiteStatus model function.
             // No need to try to update content_json via updateSiteContent, which would fail/wipe data.
        }
        res.json({ message: 'Status updated' });
    } catch (error) {
         console.error(error);
        res.status(500).json({ message: 'Server error updating site status' });
    }
}

const updateSiteContent = async (req, res) => {
    try {
        const site = await siteModel.getSiteById(req.params.id);
        if (!site) return res.status(404).json({ message: 'Site not found' });
        if (site.user_id !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

        const updatedSite = await siteModel.updateSiteContent(req.params.id, req.body);
        res.json(updatedSite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating site content' });
    }
}

const deleteSite = async (req, res) => {
    try {
        // Admin or Owner check
        const site = await siteModel.getSiteById(req.params.id);
        if (!site) return res.status(404).json({ message: 'Site not found' });
        
        if (req.user.role !== 'admin' && site.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await siteModel.deleteSite(req.params.id);
        res.json({ message: 'Site removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting site' });
    }
}

module.exports = {
    createSiteRequest,
    getMySites,
    getSiteDetails,
    getAllSitesAdmin,
    updateSiteStatus,
    updateSiteContent,
    deleteSite
};
