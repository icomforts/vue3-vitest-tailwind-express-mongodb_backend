import { NextFunction, Request, Response } from 'express';



function checkPermission(req: Request, res: Response, next: NextFunction) {
   console.log("安安");
   next()
  }

  export {
    checkPermission
  }