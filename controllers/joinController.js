const { updateMembership } = require("../db/queries");

function joinGet(req, res) {
  res.render("join", { error: null, success: null });
}

async function joinPost(req, res) {
  const { membershipCode } = req.body;

  if (membershipCode === "copycat") {
    await updateMembership(req.user.id);
    res.render("join", { error: null, success: "You are now a member" });
  } else {
    res.render("join", { error: "incorrect membership code", success: null });
  }
}

module.exports = {
  joinGet,
  joinPost,
};
