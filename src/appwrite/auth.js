import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";


export class AuthService {


    client = new Client()
    account
    constructor(){

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)

    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(
                ID.unique(), 
                email, 
                password
        
            )

            if (userAccount){
                return this.login({email, password});
            }
            else{
                return userAccount
            }
        } catch (error) {

            throw error
            
        }
    }

    async getSession() {
        try {
            // Fetch the current session
            return await this.account.getSession('current');
        } catch (error) {
            console.log("AuthService :: getSession :: No active session", error);
            return null; // Return null if no active session exists
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(
                email, 
                password
            )
        } catch (error) {
            throw error
            
        }
        
    }

    async getCurrentUser(){

    
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService


