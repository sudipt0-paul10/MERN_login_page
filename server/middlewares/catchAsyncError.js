export const catchAsyncError = (theFunction) =>{
  return (req,res,next) =>  {
    Promise.resoelve(theFunction(req,res,next)).catch(next);
  };
};