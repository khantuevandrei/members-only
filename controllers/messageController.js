const { getAllMessages, createMessage } = require("../db/queries");

async function messagesList(req, res) {
  const messages = await getAllMessages();
  res.render("messages", { messages });
}

function newMessageGet(req, res) {
  res.render("newMessage");
}

async function newMessagePost(req, res) {
  const { title, body } = req.body;
  await createMessage(req.user.id, title, body);
  res.redirect("/messages");
}

module.exports = {
  messagesList,
  newMessageGet,
  newMessagePost,
};
