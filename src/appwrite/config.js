import conf from "../conf/conf";
import { Client, Storage , ID , Databases, Query } from "appwrite";

 class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }
    async createPost({title,content,slug,status,featuredImage,userId,titleHash}){
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                titleHash,
            {
                title,
                content,
                status,
                featuredImage,
                userId,
            }                
            )
            return true
        } catch (error) {
            console.log("error in create post", error);
        }
    }

    async updatePost(slug,{title,content,status,featuredImage}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            {
                title,
                content,
                status,
                featuredImage,
            }                
            )
        } catch (error) {
            console.log("error in create updatepost", error);
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,                
            )
        } catch (error) {
            console.log("error in create deletepost", error);
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,                
            )
        } catch (error) {
            console.log("error in getpost", error);
        }
    }
    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, 
            )
        } catch (error) {
            console.log("error in getposts", error);
        }
    }
    async getPostsForCurrentUser(currentUserId) {
        try {
          const query = [
            Query.equal('userId', currentUserId), // You can include other conditions as needed
          ];
      
          return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            query,
          );
        } catch (error) {
          console.error('Error in getPostsForCurrentUser', error);
          throw error; // Rethrow the error to handle it in the calling code
        }
      }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file 
            )
        } catch (error) {
            console.log("error in createFile", error);
        }
    }
    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,    
                fileID
            )
        } catch (error) {
            console.log("error in deleteFile", error);
        }
    }
    getFilePreview(fileID){
        try {
            return  this.bucket.getFilePreview(
                conf.appwriteBucketId,    
                fileID
            )
        } catch (error) {
            console.log("error in getFilePreview", error);
        }
    }

}   


const service = new Service()


export default service