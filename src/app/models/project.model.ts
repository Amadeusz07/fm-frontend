import { User } from './user.model';

export interface Project {
    _id: string;
    ownerId: string;
    name: string;
    addedDate: Date;
    addedDateString: string;
    disabledDate: Date;
    disabledDateString: string;
    disabled: boolean;
    assignedUsers: User[];
}
