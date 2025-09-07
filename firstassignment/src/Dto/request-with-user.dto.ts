import type {Request} from "express";
import type {UserMetadata} from "./user-metadata";

export interface RequestWithUser extends Request {
    user?: UserMetadata;
}