import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

// Interface for bookmarks model
export interface IBookmarks {
  _id?: any,
  bookmarks?: string,
  lastAccessed?: Date,
  lastUpdated?: Date,
  version?: string
}

// Interface for bookmarks mongoose model
export interface IBookmarksModel extends IBookmarks, mongoose.Document {
  _id: any
}

// Implements a mongoose schema and model to connect data service methods to MongoDB collection
export default (() => {
  const types: any = mongoose.Types;

  // Create bookmarks schema to store bookmarks sync data
  // Store IDs as binary uuid v4 and disable default id properties
  // No concurrent updates so disable version keys
  const bookmarksSchema = new mongoose.Schema(
    {
      _id: {
        default: uuid.v4,
        type: String
      },
      bookmarks: String,
      lastAccessed: {
        default: () => new Date(),
        type: Date
      },
      lastUpdated: {
        default: () => new Date(),
        type: Date
      },
      version: String
    },
    {
      _id: false,
      id: false,
      versionKey: false
    }
  );

  return mongoose.model<IBookmarksModel>('Bookmark', bookmarksSchema, 'bookmarks');
})();