import { z } from "zod";
import { ApiError } from "../utils/ApiError.js";

/**
 * Validation runner middleware supporting Zod schemas
 * @param {import('zod').ZodSchema} schema
 */
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const formattedErrors = err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      const errorMessage = err.errors.map((e) => e.message).join(", ");
      return next(
        new ApiError(400, `Validation Error: ${errorMessage}`, formattedErrors, "VALIDATION_ERROR")
      );
    }
    next(err);
  }
};

export default {
  validate,
};
