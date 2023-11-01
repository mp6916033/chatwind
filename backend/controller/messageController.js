const asyncWrapper = require("../middleWare/asyncWrapper");
const messageModel = require("../model/MessageModel");
const chatModel = require("../model/ChatModel");
const ErrorHandler = require("../appUtills/error");
const userModel = require("../model/UserModel");



exports.getAllMessage = asyncWrapper(async (req, res, next) => {
  const messages = await messageModel
    .find({ chat: req.params.chatId })
    .populate("sender", "name pic email")
    .populate("chat");
  if (!messages) {
    return next(new ErrorHandler("Chat id not found", 404));
  }
 res.json(messages);
});



exports.sendMessage = asyncWrapper(async (req, res, next) => {
  const { content, chatId } = req.body;



  if (!content || !chatId) {
    return next(new ErrorHandler("Invalid data passed into request", 400));
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  let message = await messageModel.create(newMessage);
  message = await message.populate("sender", "name pic");
  message = await message.populate("chat");
  message = await userModel.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });



  await chatModel.findByIdAndUpdate(req.body.chatId, {
    latestMessage: message,
  });

    res.json(message);

});
