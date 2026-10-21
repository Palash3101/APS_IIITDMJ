import { ImageKitFile, Member } from './types';

export function toNameCase(str: string) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function createMembers(files: ImageKitFile[]): Member[] {
  return files.map((file) => ({
    image: file.url,
    name: toNameCase(file.name.split(".")[0]), // Extract name from file name
    linkedin: "#",
    twitter: "#",
    instagram: "#",
    gmail: "#",
  }));
}