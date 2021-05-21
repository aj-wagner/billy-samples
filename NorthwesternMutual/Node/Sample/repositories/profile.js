const { Profile } = require("../models/models");

const createProfile = async (uid) => {
  try {
    const profile = new Profile({ uid });
    await profile.save();

    if (!profile) {
      return null;
    }

    return profile;
  } catch (err) {
    return null;
  }
};

const getProfileWithId = async (id) => {
  try {
    if (!profile) {
      return null;
    }

    const profile = await Profile.findById(id);

    if (!profile) {
      return null;
    }
  } catch (err) {
    return null;
  }
};

const getProfileWithUID = async (uid) => {
  try {
    if (!uid) {
      return null;
    }

    const profile = await Profile.findOne({ uid }).exec();

    if (!profile) {
      return null;
    }

    return profile;
  } catch (err) {
    return null;
  }
};

const updateProfile = async (
  profile,
  { firstName, lastName, institution, dob, subjects, city }
) => {
  try {
    if (!profile) {
      return null;
    }

    profile.first_name = firstName;
    profile.last_name = lastName;
    profile.institution = institution;
    profile.date_of_birth = dob;
    profile.subjects = subjects;
    profile.city = city;

    await profile.save();

    return profile;
  } catch (err) {
    return null;
  }
};

const updateTextbooks = async (profile, textbooks) => {
  if (!profile || !textbooks) {
    return null;
  }

  // Set the textbooks to updated one
  profile.textbooks_history = textbooks;
  await profile.save();

  return profile;
};

const updateQuota = async (profile, newQuota) => {
  if (!profile || !newQuota) {
    return null;
  }

  // Set the quota to the new number
  profile.quota = newQuota;
  await profile.save();

  return profile;
};

const startSubscription = async (profile) => {
  if (!profile) {
    return null;
  }

  // Set subscription start date
  const date = new Date.now();
  profile.subscription_start = date;

  // Set subscription end_date
  date.setMonth(date.getMonth() + 1);
  profile.subscription_end = date;

  // Set subscription_status to active
  profile.subscription_status = "ACTIVE";

  await profile.save();

  return profile;
};

const endSubscription = async (profile) => {
  if (!profile) {
    return null;
  }

  profile.subscription_start = null;
  profile.subscription_end = null;
  profile.subscription_status = "SUSPENDED";

  await profile.save();

  return profile;
};

module.exports = {
  createProfile,
  getProfileWithId,
  getProfileWithUID,
  updateProfile,
  updateQuota,
  updateTextbooks,
  startSubscription,
  endSubscription,
};
