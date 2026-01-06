import { StatusName, UserType } from '../../constants';

export type BookingBadgeProp = {
  status: StatusName;
  value?: string;
  className?: string;
};

export type UserTypeBadgeProp = Omit<BookingBadgeProp, 'status'> & {
  type: UserType;
};

export type UserStatusBadgeProp = Omit<BookingBadgeProp, 'status'> & {
  status: boolean;
};
