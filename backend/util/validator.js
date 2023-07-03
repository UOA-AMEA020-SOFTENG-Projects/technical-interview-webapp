import mongoose from "mongoose";

function invalidId(id) {
  const valid = mongoose.isValidObjectId(id);
  if (!valid) {
    return true;
  }
  return false;
}

export default invalidId;
