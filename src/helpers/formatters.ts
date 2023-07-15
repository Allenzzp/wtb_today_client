import { format, utcToZonedTime } from "date-fns-tz";
import { Availability } from "../App";

const vanTZ = "America/Vancouver";

export const formatAvailability = (availability: Availability): string => {
  if (availability instanceof Date) {
    const vancouverDate = utcToZonedTime(availability, vanTZ);
    const formattedDate = format(vancouverDate, "EEE, MMM d, yyyy");
    return formattedDate;
  } else {
    return availability;
  }
};
