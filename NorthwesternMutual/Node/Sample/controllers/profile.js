const { Profile } = require("../services/services");

const createProfile = async (req, res) => {
  try {
    const { uid } = req.body;

    const { error, newProfile } = await Profile.createProfile(uid);
    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json(newProfile);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getProfileWithUID = async (req, res) => {
  try {
    const { uid } = req.body;

    const { error, profile } = await Profile.getProfileWithUID(uid);

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { uid, userInformation } = req.body;

    const { error, updatedProfile } = await Profile.updateProfile(
      uid,
      userInformation
    );

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json(updatedProfile);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const startSubscription = async (req, res) => {
  try {
    const { uid } = req.body;

    const { error, updatedProfile } = await Profile.startSubscription(uid);

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json(updatedProfile);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const endSubscription = async (req, res) => {
  try {
    const { uid } = req.body;

    const { error, updatedProfile } = await Profile.endSubscription(uid);

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json(updatedProfile);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const updateQuota = async (req, res) => {
  try {
    const { uid, newQuota } = req.body;

    const { error, updatedProfile } = await Profile.updateQuota(uid, newQuota);

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json(updatedProfile);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const updateTextbooks = async (req, res) => {
  try {
    const { uid, textbooks } = req.body;

    const { error, updatedProfile } = await Profile.updateTextbooks(
      uid,
      textbooks
    );

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json(updatedProfile);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = {
  createProfile,
  getProfileWithUID,
  updateProfile,
  startSubscription,
  endSubscription,
  updateQuota,
  updateTextbooks,
};
