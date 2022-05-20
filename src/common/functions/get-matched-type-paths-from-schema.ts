import { Schema } from 'mongoose';

export const getMatchedTypePathsFromSchema = (
  schema: Schema<any>,
  match_type: string,
) => {
  return Object.keys(schema.paths).filter(
    (item) => schema.path(item).instance === match_type,
  );
};
