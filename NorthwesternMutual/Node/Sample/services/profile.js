const { update } = require("../models/user");
const { Profile } = require("../repositories/repositories");

const createProfile = async (uid) => {
  try {
    if (!uid) {
      return { error: `uid cannot be empty` };
    }

    if (await Profile.getProfileWithUID(uid)) {
      return { error: `${uid} has an associated profile already` };
    }

    const newProfile = Profile.createProfile(uid);
    if (!newProfile) {
      return { error: `Failed to create new profile` };
    }

    return { newProfile };
  } catch (err) {
    return { error: err };
  }
};

const getProfileWithUID = async (uid) => {
  try {
    if (!uid) {
      return { error: `uid cannot be empty` };
    }

    const profile = Profile.getProfileWithUID(uid);
    if (!profile) {
      return { error: `Profile with uid ${uid} not found` };
    }

    return { profile };
  } catch (err) {
    return { error: err };
  }
};

const updateProfile = async (uid, newProfileInformation) => {
  try {
    if (!uid) {
      return { error: `uid cannot be empty` };
    }

    if (!profileInformation) {
      return { error: `newpProfileInformation cannot be empty` };
    }

    const profile = Profile.getProfileWithUID(uid);
    if (!profile) {
      return { error: `profile with uid ${uid} not found` };
    }

    const updatedProfile = Profile.updateProfile(
      profile,
      newProfileInformation
    );
    if (!updatedProfile) {
      return { error: `error in updating profile` };
    }

    return { updatedProfile };
  } catch (err) {
    return { error: err };
  }
};

const startSubscription = async (uid) => {
  try {
    if (!uid) {
      return { error: `uid cannot be empty` };
    }

    const profile = Profile.getProfileWithUID(uid);
    if (!profile) {
      return { error: `profile with uid ${uid} not found` };
    }

    const updatedProfile = await Profile.startSubscription(profile);
    if (!updatedProfile) {
      return { error: `error in starting subscription` };
    }

    return { updatedProfile };
  } catch (err) {
    return { error: err };
  }
};

const endSubscription = async (uid) => {
  try {
    if (!uid) {
      return { error: `uid cannot be empty` };
    }

    const profile = Profile.getProfileWithUID(uid);
    if (!profile) {
      return { error: `profile with uid ${uid} not found` };
    }

    const updatedProfile = await Profile.endSubscription(profile);
    if (!updatedProfile) {
      return { error: `error in ending subscription` };
    }

    return { updatedProfile };
  } catch (err) {
    return { error: err };
  }
};

const updateQuota = async (uid, newQuota) => {
  try {
    if (!uid) {
      return { error: `uid cannot be empty` };
    }

    if (!newQuota || newQuota < 1) {
      return { error: `new quota cannot be less than 1` };
    }

    const profile = Profile.getProfileWithUID(uid);
    if (!profile) {
      return { error: `profile with uid ${uid} not found` };
    }

    const updatedProfile = await Profile.updateQuota(profile, newQuota);
    if (!updatedProfile) {
      return { error: `error in updating quota` };
    }

    return { updatedProfile };
  } catch (err) {
    return { error: err };
  }
};

const updateTextbooks = async (uid, newTextbooks) => {
  try {
    if (!uid) {
      return { error: `uid cannot be empty` };
    }

    if (!newTextbooks || newTextbooks.length < 0) {
      return { error: `new textbooks cannot be empty` };
    }

    const profile = Profile.getProfileWithUID(uid);
    if (!profile) {
      return { error: `profile with uid ${uid} not found` };
    }

    const updatedProfile = await Profile.updateTextbooks(profile, newTextbooks);
    if (!updatedProfile) {
      return { error: `error in updating textbooks history` };
    }

    return { updatedProfile };
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  createProfile,
  getProfileWithUID,
  updateProfile,
  updateQuota,
  updateTextbooks,
  startSubscription,
  endSubscription,
};
