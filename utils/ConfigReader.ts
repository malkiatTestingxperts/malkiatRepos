import PropertiesReader from 'properties-reader';
import path from 'path';

const properties = PropertiesReader(path.resolve(__dirname, 'config.prop'));

export function getProp(key: string): string {
  const value = properties.get(key);
  if (!value) {
    throw new Error(`Property ${key} not found in config.prop`);
  }
  return value.toString();
}
