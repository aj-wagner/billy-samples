const express = require("express");
const router = express.Router();

const { Profile } = require("../controllers/controllers");

router.get("/", Profile.getProfileWithUID);
router.post("/create", Profile.createProfile);
router.post("/update", Profile.updateProfile);
router.post("/subscription-start", Profile.startSubscription);
router.post("/subscription-end", Profile.endSubscription);
router.post("/quota-update", Profile.updateQuota);
router.post("/textbooks-update", Profile.updateTextbooks);
