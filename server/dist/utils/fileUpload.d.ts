import multer from "multer";
export declare const upload: multer.Multer;
export declare const getFileUrl: (filename: string) => string;
export declare const deleteFile: (filename: string) => void;
export declare const getFilenameFromUrl: (url: string) => string;
