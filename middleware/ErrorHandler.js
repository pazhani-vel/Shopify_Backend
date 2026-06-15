const {constant} = require('../constant')


const errorhandler = (err,req,res,next) => 
{
    const statuscode = res.statusCode ? res.statusCode : 500;

    if(statuscode === constant.INTERNAL_SERVER_ERROR)
    {
res.json({title:"Internal Server Error",message : err.message,stackTrack:err.stack});
    }
    else if(statuscode === constant.BAD_REQUEST)   // paramenters missing
    {
        res.json({title:"Bad Request",message : err.message,stackTrack:err.stack});
    }
    else if(statuscode === constant.PAGE_NOT_FOUND)
    {
res.json({title:"Page Not Found",message : err.message,stackTrack:err.stack});
    }
    else 
    {
        res.json({title:"Something went wrong",message : err.message,stackTrack:err.stack});
    }
}


module.exports = {errorhandler};