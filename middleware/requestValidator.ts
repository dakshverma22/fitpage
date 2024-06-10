import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ObjectSchema } from "joi";

const validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      next();
    };
  };

export default validate