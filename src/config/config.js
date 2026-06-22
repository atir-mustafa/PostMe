const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteArticleCollectionId: String(import.meta.env.VITE_APPWRITE_ARTICLES_COLLECTION_ID),
  appwriteProfileCollectionId: String(import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID),
  appwriteReactionCollectionId: String(import.meta.env.VITE_APPWRITE_REACTIONS_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default config