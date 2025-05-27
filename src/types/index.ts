export interface Message {
    sender: string|undefined;
    text?: string;
    audioBlob?: Blob;

  }
  
  export interface UserInfo {
    name: string;
    phone: string;
  }
  