const asyncHandler = require('express-async-handler')
const NotificationModel = require('../Model/NotificationModel')


// used for getting the notification
// get method
// private route
const GetAllNotification = asyncHandler(async(req,res)=>{
    const notifications = await NotificationModel.find({
    user:req.user.id
})
.sort({createdAt:-1});

res.status(200).json(notifications);
})

// used for read the notification
// put method
// private route
const ReadNotification = asyncHandler(async(req,res)=>{
    const notificationId = req.params.id;

const notification = await NotificationModel.findById(
    notificationId
);

if(!notification)
{
    res.status(404);
    throw new Error("Notification not found");
}

if(notification.user.toString() !== req.user.id)
{
    res.status(403);
    throw new Error("Unauthorized");
}

notification.isRead = true;

await notification.save();

res.status(200).json({
    message:"Notification marked as read",
    notification
});

})

// used for read all the notification
// put method
// private route
const ReadAllNotification = asyncHandler(async(req,res)=>{
    await NotificationModel.updateMany(
    {
        user:req.user.id,
        isRead:false
    },
    {
        $set:{
            isRead:true
        }
    }
);

res.status(200).json({
    message:"All notifications marked as read"
});

})

// used for delete the notification
// delete method
// private route
const DeleteNotification = asyncHandler(async(req,res)=>{
    const notificationId = req.params.id;

const notification = await NotificationModel.findById(
    notificationId
);

if(!notification)
{
    res.status(404);
    throw new Error("Notification not found");
}

if(notification.user.toString() !== req.user.id)
{
    res.status(403);
    throw new Error("Unauthorized");
}

await notification.deleteOne();

res.status(200).json({
    message:"Notification deleted successfully"
});

})

module.exports = {GetAllNotification,ReadNotification,ReadAllNotification,DeleteNotification};