import conf from '../conf/conf.js' 
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    
    client = new Client()
    databases;
    bucket;
    account 

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

       this.databases = new Databases(this.client);
       
       this.bucket =  new Storage(this.client);
    }

    async createPost({title, slug, content, featuredimage, status, userid})
    {
         
        try {

            return await databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { 
                    title,
                    content,
                    featuredimage,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.log("error in crearing post")
        }
    }

    async updatePost(slug, {title, content, featuredimage, status}){

        try {
            
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status, 
                    featuredimage
                }
        
            )
            

        } catch (error)
        {
            throw error
            
        }
    }

    async deletePost (slug){

        try {
            
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
            
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }

    }

    async getPost(slug){

        return await databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
            
        )

    }

    async getPosts( Queries = [Query.equal("status", "active")]){

        try {

            return await  this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Queries 
            )
            
        } catch (error) {
            console.log("Appwrite serive :: getposts :: error", error);
        }

    }


    // file manupilaiton Services 


    
    async uploadFile(file){

        try {

            await  this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
                
            );
            
        } catch (error) {
            console.log("Appwrite serive :: uploadfile :: error", error);
        }
    }

    async deleteFile(fileId){


        try {
            
            await  this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
                
            );
            return true
        } catch (error) {

            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
        
    }


    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );

    }

}

const service = new Service()
export default service