
interface ImageWithUrl {
    id: number;
    url: string;
  }
  
  export interface UserProfileDetail {
    id: number;
    firstName: string;
    lastName: string;
    profileImage: ImageWithUrl;
  }
  
  interface CompanyInfo {
    id: number;
    name: string;
    profileImg: ImageWithUrl;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    profileDetail?: UserProfileDetail;
    company?: CompanyInfo;
  }
  
  