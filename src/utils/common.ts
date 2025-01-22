export const getInitials = (name: string): string => {
 const nameParts = name.split(" ");
 const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
 return initials;
};