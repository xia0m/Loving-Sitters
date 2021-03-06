import { Profile } from './Profile';
import { User } from './User';

export interface Request {
  _id: string;
  user?: User;
  sitter?: Profile;
  otherUser?: Profile;
  createdBy?: Profile;
  receivedBy?: Profile;
  start: Date;
  end: Date;
  accepted: boolean;
  declined: boolean;
  paid: boolean;
}

export interface RequestAPIData {
  requests?: Request[];
  request?: Request;
  error?: { message: string };
}
