import config from "../config/config";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({title, slug, content, featuredImage, status, userId, authorName}) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteArticleCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          authorName
        }
      )      
    } catch (error) {
      throw error
    }
  }

  async updatePost(slug, {title, content, featuredImage, status}) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteArticleCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )      
    } catch (error) {
      throw error
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteArticleCollectionId,
        slug
      ) 
      return true     
    } catch (error) {
      throw error
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteArticleCollectionId,
        slug
      )      
    } catch (error) {
      throw error
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]){
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteArticleCollectionId,
        queries
      )
    } catch (error) {
      throw error
    }
  }

  // profile service

  async createProfile({
    userId,
    authorName,
    description,
    profileImage,
    tags
  }) {
    return await this.databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteProfileCollectionId,
      ID.unique(),
      {
        userId,
        authorName,
        description,
        profileImage,
        tags
      }
    );
  }

  async getProfile(userId) {
    const result = await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteProfileCollectionId,
      [
        Query.equal("userId", userId)
      ]
    );

    return result.documents[0] || null;
  }

  async getAllProfiles() {
    const result = await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteProfileCollectionId
    );

    return result.documents;
  }

  async updateProfile(documentId, data) {
    return await this.databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteProfileCollectionId,
      documentId,
      data
    );
  }


  // reaction service

  async addReaction(postId, userId, reaction) {
    return await this.databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteReactionCollectionId,
      ID.unique(),
      {
          postId,
          userId,
          reaction
      }
    )
  }

  async updateReaction(documentId, reaction) {
    return await this.databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteReactionCollectionId,
      documentId,
      {
          reaction
      }
    )
  }

  async deleteReaction(documentId) {
    return await this.databases.deleteDocument(
      config.appwriteDatabaseId,
      config.appwriteReactionCollectionId,
      documentId
    )
  }

  async getUserReaction(postId, userId) {
    const result = await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteReactionCollectionId,
      [
          Query.equal("postId", postId),
          Query.equal("userId", userId)
      ]
    )
    return result.documents[0] || null
  }

  async getLikedPostsByUser(userId) {
    return await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteReactionCollectionId,
      [
          Query.equal("userId", userId),
          Query.equal("reaction", "like")
      ]
    );
  }

  async getLikes(postId) {
    const result = await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteReactionCollectionId,
      [
          Query.equal("postId", postId),
          Query.equal("reaction", "like")
      ]
    )
    return result.total
  }

  async getDislikes(postId) {
    const result = await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteReactionCollectionId,
      [
          Query.equal("postId", postId),
          Query.equal("reaction", "dislike")
      ]
    )
    return result.total
  }

  // file upload services

  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      throw error
    }
  }

  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      throw error
    }
  }

  getFileView(fileId){
    return this.bucket.getFileView(
      config.appwriteBucketId,
      fileId
    )
  }
}

const service = new Service()

export default service